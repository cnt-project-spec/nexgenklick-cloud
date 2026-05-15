-- ============================================
-- NexGenKlick - Student Internship Portal DB
-- Azure SQL Script - CORRECTED VERSION
-- Fixed by: Cloud Engineer (Hervé)
-- Date: May 2026
-- Changes: Removed CREATE DATABASE + USE statements
--          Changed all TEXT to NVARCHAR(MAX)
-- ============================================

-- Roles Table
CREATE TABLE Roles (
    role_id INT IDENTITY(1,1) PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- Users Table
CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    role_id INT NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    is_active BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Users_Roles
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Students Table
CREATE TABLE Students (
    student_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    student_number VARCHAR(50) NOT NULL UNIQUE,
    program VARCHAR(150) NOT NULL,
    phone VARCHAR(30),
    resume_url VARCHAR(255),

    CONSTRAINT FK_Students_Users
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Employers Table
CREATE TABLE Employers (
    employer_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    company_name VARCHAR(150) NOT NULL,
    contact_person VARCHAR(150) NOT NULL,
    industry VARCHAR(100),
    phone VARCHAR(30),

    CONSTRAINT FK_Employers_Users
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Internship_Postings Table
-- FIXED: description changed from TEXT to NVARCHAR(MAX)
CREATE TABLE Internship_Postings (
    posting_id INT IDENTITY(1,1) PRIMARY KEY,
    employer_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description NVARCHAR(MAX) NOT NULL,
    location VARCHAR(150),
    work_mode VARCHAR(50) CHECK (work_mode IN ('Onsite', 'Remote', 'Hybrid')),
    deadline DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Draft'
        CHECK (status IN ('Draft', 'Active', 'Closed', 'Cancelled')),
    created_at DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Postings_Employers
    FOREIGN KEY (employer_id) REFERENCES Employers(employer_id)
);

-- Applications Table
CREATE TABLE Applications (
    application_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL,
    posting_id INT NOT NULL,
    status VARCHAR(50) DEFAULT 'Submitted'
        CHECK (status IN ('Submitted', 'Under Review', 'Interview', 'Accepted', 'Rejected', 'Withdrawn')),
    applied_at DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Applications_Students
    FOREIGN KEY (student_id) REFERENCES Students(student_id),

    CONSTRAINT FK_Applications_Postings
    FOREIGN KEY (posting_id) REFERENCES Internship_Postings(posting_id),

    CONSTRAINT UQ_Student_Posting
    UNIQUE (student_id, posting_id)
);

-- Application_Documents Table
CREATE TABLE Application_Documents (
    document_id INT IDENTITY(1,1) PRIMARY KEY,
    application_id INT NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(150) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    uploaded_at DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Documents_Applications
    FOREIGN KEY (application_id) REFERENCES Applications(application_id)
);

-- Application_Status_History Table
-- FIXED: comments changed from TEXT to NVARCHAR(MAX)
CREATE TABLE Application_Status_History (
    history_id INT IDENTITY(1,1) PRIMARY KEY,
    application_id INT NOT NULL,
    old_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    changed_by_user_id INT NOT NULL,
    comments NVARCHAR(MAX),
    changed_at DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_StatusHistory_Applications
    FOREIGN KEY (application_id) REFERENCES Applications(application_id),

    CONSTRAINT FK_StatusHistory_Users
    FOREIGN KEY (changed_by_user_id) REFERENCES Users(user_id)
);

-- Notifications Table
-- FIXED: message changed from TEXT to NVARCHAR(MAX)
CREATE TABLE Notifications (
    notification_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    message NVARCHAR(MAX) NOT NULL,
    is_read BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Notifications_Users
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IDX_Users_Email
ON Users(email);

CREATE INDEX IDX_Postings_Employer
ON Internship_Postings(employer_id);

CREATE INDEX IDX_Postings_Status
ON Internship_Postings(status);

CREATE INDEX IDX_Applications_Student
ON Applications(student_id);

CREATE INDEX IDX_Applications_Posting
ON Applications(posting_id);

CREATE INDEX IDX_Applications_Status
ON Applications(status);

CREATE INDEX IDX_Notifications_User
ON Notifications(user_id);

-- ============================================
-- TEST DATA
-- ============================================

INSERT INTO Roles (role_name) 
VALUES 
('Admin'),
('Student'),
('Employer');

INSERT INTO Users (role_id, full_name, email, password_hash) 
VALUES
(1, 'System Admin', 'admin@portal.com', 'hashed_password_001'),
(2, 'John Student', 'john.student@email.com', 'hashed_password_002'),
(3, 'ABC Employer', 'employer@abccompany.com', 'hashed_password_003');

INSERT INTO Students (user_id, student_number, program, phone, resume_url) 
VALUES
(2, 'STU-2026-001', 'Computer Network Technology', '514-000-1111', '/documents/resume_john.pdf');

INSERT INTO Employers (user_id, company_name, contact_person, industry, phone) 
VALUES
(3, 'ABC Technology Inc.', 'Mary Employer', 'Information Technology', '514-000-2222');

INSERT INTO Internship_Postings 
(employer_id, title, description, location, work_mode, deadline, status)  
VALUES
(1, 'Junior Network Support Intern', 
 'Support network operations, troubleshooting, and documentation.',
 'Montreal, QC', 'Hybrid', '2026-06-30', 'Active');

INSERT INTO Applications (student_id, posting_id, status)
VALUES
(1, 1, 'Submitted');

INSERT INTO Application_Documents 
(application_id, document_type, file_name, file_path)
VALUES
(1, 'Resume', 'resume_john.pdf', '/documents/resume_john.pdf');

INSERT INTO Notifications (user_id, title, message)
VALUES
(2, 'Application Submitted', 'Your internship application has been submitted successfully.');

-- ============================================
-- STORED PROCEDURES
-- ============================================

-- 1. STUDENT MODULE

-- Create Student Profile
-- FIXED: @ResumeUrl kept as VARCHAR (no TEXT here)
CREATE PROCEDURE sp_CreateStudentProfile
    @FullName VARCHAR(150),
    @Email VARCHAR(150),
    @PasswordHash VARCHAR(255),
    @StudentNumber VARCHAR(50),
    @Program VARCHAR(150),
    @Phone VARCHAR(30),
    @ResumeUrl VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Users (role_id, full_name, email, password_hash, is_active)
    VALUES (2, @FullName, @Email, @PasswordHash, 1);

    DECLARE @UserId INT = SCOPE_IDENTITY();

    INSERT INTO Students (user_id, student_number, program, phone, resume_url)
    VALUES (@UserId, @StudentNumber, @Program, @Phone, @ResumeUrl);
END;
GO

-- Read Student Profile
CREATE PROCEDURE sp_GetStudentProfile
    @StudentId INT
AS
BEGIN
    SELECT 
        s.student_id,
        u.full_name,
        u.email,
        s.student_number,
        s.program,
        s.phone,
        s.resume_url,
        u.is_active,
        u.created_at
    FROM Students s
    INNER JOIN Users u ON s.user_id = u.user_id
    WHERE s.student_id = @StudentId;
END;
GO

-- Update Student Profile
CREATE PROCEDURE sp_UpdateStudentProfile
    @StudentId INT,
    @FullName VARCHAR(150),
    @Email VARCHAR(150),
    @Program VARCHAR(150),
    @Phone VARCHAR(30),
    @ResumeUrl VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Users
    SET full_name = @FullName,
        email = @Email
    WHERE user_id = (
        SELECT user_id FROM Students WHERE student_id = @StudentId
    );

    UPDATE Students
    SET program = @Program,
        phone = @Phone,
        resume_url = @ResumeUrl
    WHERE student_id = @StudentId;
END;
GO

-- Deactivate Student Account
CREATE PROCEDURE sp_DeactivateStudentAccount
    @StudentId INT
AS
BEGIN
    UPDATE Users
    SET is_active = 0
    WHERE user_id = (
        SELECT user_id FROM Students WHERE student_id = @StudentId
    );
END;
GO

-- ============================================
-- 2. EMPLOYER MODULE

-- Create Internship Posting
-- FIXED: @Description changed from TEXT to NVARCHAR(MAX)
CREATE PROCEDURE sp_CreateInternshipPosting
    @EmployerId INT,
    @Title VARCHAR(150),
    @Description NVARCHAR(MAX),
    @Location VARCHAR(150),
    @WorkMode VARCHAR(50),
    @Deadline DATE,
    @Status VARCHAR(50)
AS
BEGIN
    INSERT INTO Internship_Postings
    (employer_id, title, description, location, work_mode, deadline, status)
    VALUES
    (@EmployerId, @Title, @Description, @Location, @WorkMode, @Deadline, @Status);
END;
GO

-- Read Internship Postings by Employer
CREATE PROCEDURE sp_GetEmployerPostings
    @EmployerId INT
AS
BEGIN
    SELECT 
        posting_id,
        title,
        description,
        location,
        work_mode,
        deadline,
        status,
        created_at
    FROM Internship_Postings
    WHERE employer_id = @EmployerId
    ORDER BY created_at DESC;
END;
GO

-- Read Applicants for Posting
CREATE PROCEDURE sp_GetApplicantsByPosting
    @PostingId INT
AS
BEGIN
    SELECT 
        a.application_id,
        a.status AS application_status,
        a.applied_at,
        s.student_id,
        u.full_name AS student_name,
        u.email AS student_email,
        s.program,
        s.phone,
        s.resume_url
    FROM Applications a
    INNER JOIN Students s ON a.student_id = s.student_id
    INNER JOIN Users u ON s.user_id = u.user_id
    WHERE a.posting_id = @PostingId
    ORDER BY a.applied_at DESC;
END;
GO

-- Update Internship Posting
-- FIXED: @Description changed from TEXT to NVARCHAR(MAX)
CREATE PROCEDURE sp_UpdateInternshipPosting
    @PostingId INT,
    @EmployerId INT,
    @Title VARCHAR(150),
    @Description NVARCHAR(MAX),
    @Location VARCHAR(150),
    @WorkMode VARCHAR(50),
    @Deadline DATE,
    @Status VARCHAR(50)
AS
BEGIN
    UPDATE Internship_Postings
    SET title = @Title,
        description = @Description,
        location = @Location,
        work_mode = @WorkMode,
        deadline = @Deadline,
        status = @Status
    WHERE posting_id = @PostingId
      AND employer_id = @EmployerId;
END;
GO

-- Close Internship Posting
CREATE PROCEDURE sp_CloseInternshipPosting
    @PostingId INT,
    @EmployerId INT
AS
BEGIN
    UPDATE Internship_Postings
    SET status = 'Closed'
    WHERE posting_id = @PostingId
      AND employer_id = @EmployerId;
END;
GO

-- ============================================
-- 3. APPLICATION MODULE

-- Submit Application
CREATE PROCEDURE sp_SubmitApplication
    @StudentId INT,
    @PostingId INT
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM Applications
        WHERE student_id = @StudentId
          AND posting_id = @PostingId
    )
    BEGIN
        RAISERROR('Student has already applied to this posting.', 16, 1);
        RETURN;
    END;

    IF NOT EXISTS (
        SELECT 1
        FROM Internship_Postings
        WHERE posting_id = @PostingId
          AND status = 'Active'
          AND deadline >= CAST(GETDATE() AS DATE)
    )
    BEGIN
        RAISERROR('Posting is not active or deadline has passed.', 16, 1);
        RETURN;
    END;

    INSERT INTO Applications (student_id, posting_id, status)
    VALUES (@StudentId, @PostingId, 'Submitted');
END;
GO

-- View Student Applications
CREATE PROCEDURE sp_GetStudentApplications
    @StudentId INT
AS
BEGIN
    SELECT 
        a.application_id,
        p.title AS internship_title,
        e.company_name,
        a.status AS application_status,
        a.applied_at,
        p.deadline,
        p.location,
        p.work_mode
    FROM Applications a
    INNER JOIN Internship_Postings p ON a.posting_id = p.posting_id
    INNER JOIN Employers e ON p.employer_id = e.employer_id
    WHERE a.student_id = @StudentId
    ORDER BY a.applied_at DESC;
END;
GO

-- Update Application Status
-- FIXED: @Comments changed from TEXT to NVARCHAR(MAX)
CREATE PROCEDURE sp_UpdateApplicationStatus
    @ApplicationId INT,
    @NewStatus VARCHAR(50),
    @ChangedByUserId INT,
    @Comments NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @OldStatus VARCHAR(50);

    SELECT @OldStatus = status
    FROM Applications
    WHERE application_id = @ApplicationId;

    UPDATE Applications
    SET status = @NewStatus
    WHERE application_id = @ApplicationId;

    INSERT INTO Application_Status_History
    (application_id, old_status, new_status, changed_by_user_id, comments)
    VALUES
    (@ApplicationId, @OldStatus, @NewStatus, @ChangedByUserId, @Comments);
END;
GO

-- Withdraw Application
CREATE PROCEDURE sp_WithdrawApplication
    @ApplicationId INT,
    @StudentId INT
AS
BEGIN
    UPDATE Applications
    SET status = 'Withdrawn'
    WHERE application_id = @ApplicationId
      AND student_id = @StudentId;
END;
GO

-- ============================================
-- 4. DOCUMENT MODULE

-- Upload Application Document
CREATE PROCEDURE sp_UploadApplicationDocument
    @ApplicationId INT,
    @DocumentType VARCHAR(50),
    @FileName VARCHAR(150),
    @FilePath VARCHAR(255)
AS
BEGIN
    INSERT INTO Application_Documents
    (application_id, document_type, file_name, file_path)
    VALUES
    (@ApplicationId, @DocumentType, @FileName, @FilePath);
END;
GO

-- Get Application Documents
CREATE PROCEDURE sp_GetApplicationDocuments
    @ApplicationId INT
AS
BEGIN
    SELECT 
        document_id,
        document_type,
        file_name,
        file_path,
        uploaded_at
    FROM Application_Documents
    WHERE application_id = @ApplicationId;
END;
GO

-- ============================================
-- 5. NOTIFICATION MODULE

-- Create Notification
-- FIXED: @Message changed from TEXT to NVARCHAR(MAX)
CREATE PROCEDURE sp_CreateNotification
    @UserId INT,
    @Title VARCHAR(150),
    @Message NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO Notifications (user_id, title, message)
    VALUES (@UserId, @Title, @Message);
END;
GO

-- Get User Notifications
CREATE PROCEDURE sp_GetUserNotifications
    @UserId INT
AS
BEGIN
    SELECT 
        notification_id,
        title,
        message,
        is_read,
        created_at
    FROM Notifications
    WHERE user_id = @UserId
    ORDER BY created_at DESC;
END;
GO

-- Mark Notification as Read
CREATE PROCEDURE sp_MarkNotificationAsRead
    @NotificationId INT,
    @UserId INT
AS
BEGIN
    UPDATE Notifications
    SET is_read = 1
    WHERE notification_id = @NotificationId
      AND user_id = @UserId;
END;
GO
