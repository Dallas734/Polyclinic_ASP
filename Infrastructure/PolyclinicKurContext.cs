using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Domain.DomainModels;

public partial class PolyclinicKurContext : DbContext
{
    protected readonly IConfiguration Configuration;
    public PolyclinicKurContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<Area> Areas { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Certificate> Certificates { get; set; }

    public virtual DbSet<Day> Days { get; set; }

    public virtual DbSet<Diagnosis> Diagnoses { get; set; }

    public virtual DbSet<Doctor> Doctors { get; set; }

    public virtual DbSet<DoctorView> DoctorViews { get; set; }

    public virtual DbSet<Gender> Genders { get; set; }

    public virtual DbSet<Patient> Patients { get; set; }

    public virtual DbSet<PatientView> PatientViews { get; set; }

    public virtual DbSet<Procedure> Procedures { get; set; }

    public virtual DbSet<Shedule> Shedules { get; set; }

    public virtual DbSet<Specialization> Specializations { get; set; }

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<Visit> Visits { get; set; }

    public virtual DbSet<VisitStatus> VisitStatuses { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Address>(entity =>
        {
            entity.ToTable("Address");

            entity.Property(e => e.AreaId).HasColumnName("Area_id");
            entity.Property(e => e.Name).HasMaxLength(256);

            entity.HasOne(d => d.Area).WithMany(p => p.Addresses)
                .HasForeignKey(d => d.AreaId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("area_fk");
        });

        modelBuilder.Entity<Area>(entity =>
        {
            entity.ToTable("Area");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Type).HasMaxLength(50);
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("Category");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Certificate>(entity =>
        {
            entity.ToTable("Certificate");

            entity.Property(e => e.DoctorId).HasColumnName("Doctor_id");
            entity.Property(e => e.RegNum).HasMaxLength(13);

            entity.HasOne(d => d.Doctor).WithMany(p => p.Certificates)
                .HasForeignKey(d => d.DoctorId)
                .HasConstraintName("FK_Certificate_Doctor");
        });

        modelBuilder.Entity<Day>(entity =>
        {
            entity.ToTable("Day");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Diagnosis>(entity =>
        {
            entity.ToTable("Diagnosis");

            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Doctor>(entity =>
        {
            entity.ToTable("Doctor", tb => tb.HasTrigger("INS_SHEDULE"));

            entity.Property(e => e.AreaId).HasColumnName("Area_id");
            entity.Property(e => e.CategoryId).HasColumnName("Category_id");
            entity.Property(e => e.FirstName).HasMaxLength(256);
            entity.Property(e => e.GenderId).HasColumnName("Gender_id");
            entity.Property(e => e.LastName).HasMaxLength(256);
            entity.Property(e => e.SpecializationId).HasColumnName("Specialization_id");
            entity.Property(e => e.StatusId).HasColumnName("Status_id");
            entity.Property(e => e.Surname).HasMaxLength(256);

            entity.HasOne(d => d.Area).WithMany(p => p.Doctors)
                .HasForeignKey(d => d.AreaId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_Doctor_Area");

            entity.HasOne(d => d.Category).WithMany(p => p.Doctors)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Doctor_Category");

            entity.HasOne(d => d.Gender).WithMany(p => p.Doctors)
                .HasForeignKey(d => d.GenderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Doctor_Gender");

            entity.HasOne(d => d.Specialization).WithMany(p => p.Doctors)
                .HasForeignKey(d => d.SpecializationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("specialization_fk");

            entity.HasOne(d => d.Status).WithMany(p => p.Doctors)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("status_fk");
        });

        modelBuilder.Entity<DoctorView>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("doctor_view");

            entity.Property(e => e.Concat)
                .HasMaxLength(770)
                .HasColumnName("concat");
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<Gender>(entity =>
        {
            entity.ToTable("Gender");

            entity.Property(e => e.Name)
                .HasMaxLength(10)
                .IsFixedLength();
        });

        modelBuilder.Entity<Patient>(entity =>
        {
            entity.ToTable("Patient");

            entity.Property(e => e.AddressId).HasColumnName("Address_id");
            entity.Property(e => e.FirstName).HasMaxLength(256);
            entity.Property(e => e.GenderId).HasColumnName("Gender_id");
            entity.Property(e => e.LastName).HasMaxLength(256);
            entity.Property(e => e.Polis).HasMaxLength(16);
            entity.Property(e => e.Surname).HasMaxLength(256);
            entity.Property(e => e.WorkPlace).HasMaxLength(256);

            entity.HasOne(d => d.Address).WithMany(p => p.Patients)
                .HasForeignKey(d => d.AddressId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_Patient_Addres");

            entity.HasOne(d => d.Gender).WithMany(p => p.Patients)
                .HasForeignKey(d => d.GenderId)
                .HasConstraintName("FK_Patient_Gender");
        });

        modelBuilder.Entity<PatientView>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("patient_view");

            entity.Property(e => e.Concat)
                .HasMaxLength(770)
                .HasColumnName("concat");
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<Procedure>(entity =>
        {
            entity.ToTable("Procedure");

            entity.Property(e => e.Name).HasMaxLength(256);
        });

        modelBuilder.Entity<Shedule>(entity =>
        {
            entity.ToTable("Shedule");

            entity.Property(e => e.BeginTime).HasPrecision(0);
            entity.Property(e => e.DayId).HasColumnName("Day_id");
            entity.Property(e => e.DoctorId).HasColumnName("Doctor_id");
            entity.Property(e => e.EndTime).HasPrecision(0);

            entity.HasOne(d => d.Day).WithMany(p => p.Shedules)
                .HasForeignKey(d => d.DayId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Shedule_Day");

            entity.HasOne(d => d.Doctor).WithMany(p => p.Shedules)
                .HasForeignKey(d => d.DoctorId)
                .HasConstraintName("FK_Shedule_Doctor");
        });

        modelBuilder.Entity<Specialization>(entity =>
        {
            entity.ToTable("Specialization");

            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Status>(entity =>
        {
            entity.ToTable("Status");

            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Visit>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Visit_1");

            entity.ToTable("Visit");

            entity.Property(e => e.DiagnosisId)
                .HasDefaultValue(9)
                .HasColumnName("Diagnosis_id");
            entity.Property(e => e.DoctorId).HasColumnName("Doctor_id");
            entity.Property(e => e.PatientId).HasColumnName("Patient_id");
            entity.Property(e => e.ProcedureId)
                .HasDefaultValue(4)
                .HasColumnName("Procedure_id");
            entity.Property(e => e.Recipe).HasMaxLength(256);
            entity.Property(e => e.VisitStatusId)
                .HasDefaultValue(1)
                .HasColumnName("VisitStatus_id");

            entity.HasOne(d => d.Diagnosis).WithMany(p => p.Visits)
                .HasForeignKey(d => d.DiagnosisId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_Visit_Diagnosis1");

            entity.HasOne(d => d.Doctor).WithMany(p => p.Visits)
                .HasForeignKey(d => d.DoctorId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_Visit_Doctor");

            entity.HasOne(d => d.Patient).WithMany(p => p.Visits)
                .HasForeignKey(d => d.PatientId)
                .HasConstraintName("FK_Visit_Patient");

            entity.HasOne(d => d.Procedure).WithMany(p => p.Visits)
                .HasForeignKey(d => d.ProcedureId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_Visit_Procedure");

            entity.HasOne(d => d.VisitStatus).WithMany(p => p.Visits)
                .HasForeignKey(d => d.VisitStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Visit_VisitStatus");
        });

        modelBuilder.Entity<VisitStatus>(entity =>
        {
            entity.ToTable("VisitStatus");

            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
