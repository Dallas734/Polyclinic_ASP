using Application.DTOs;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Polyclinic_ASP.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class DoctorsControllerTests
{
    private readonly Mock<IDbCrud> _mockDbCrud;
    private readonly DoctorsController _controller;
    private readonly Mock<IDoctorService> _mockDoctorService;

    public DoctorsControllerTests()
    {
        _mockDbCrud = new Mock<IDbCrud>();
        _mockDoctorService = new Mock<IDoctorService>();
        _controller = new DoctorsController(_mockDbCrud.Object, _mockDoctorService.Object);
    }

    [Fact]
    public async Task GetDoctors()
    {
        // Arrange
        var expectedDoctors = new List<DoctorDTO>
        {
            new DoctorDTO { Id = 1, Area = null, Category = null, DateOfBirth = new DateOnly(), FirstName = "asd", LastName = "adasd", Surname = "sad", Gender = null, Specialization = null, Status = null },
        };

        _mockDbCrud.Setup(db => db.doctorDTOs).Returns(expectedDoctors);

        // Act
        var result = await _controller.GetDoctors();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnValue = Assert.IsType<List<DoctorDTO>>(okResult.Value);
        Assert.Equal(expectedDoctors.Count, returnValue.Count);
    }

    [Fact]

    public async Task PostDoctor()
    {
        // Arrange
        var doctor = new DoctorDTO
        {
            Id = 1,
            Area = new AreaDTO { Id = 1 },
            Category = new CategoryDTO { Id = 1 },
            DateOfBirth = new DateOnly(),
            FirstName = "asd",
            LastName = "adasd",
            Surname = "sad",
            Gender = new GenderDTO { Id = 1 },
            Specialization = new SpecializationDTO() { Id = 1 },
            Status = new StatusDTO { Id = 1 }
        };
        _mockDbCrud.Setup(db => db.AddDoctor(It.IsAny<DoctorDTO>())).Returns(1);
        _mockDbCrud.Setup(db => db.Save()).Returns(Task.CompletedTask);
        _mockDbCrud.Setup(db => db.specializationDTOs).Returns(new List<SpecializationDTO>()
        {
            new SpecializationDTO { Id = 1}
        });
        _mockDbCrud.Setup(db => db.areaDTOs).Returns(new List<AreaDTO>()
        {
            new AreaDTO { Id = 1 }
        });
        _mockDbCrud.Setup(db => db.categoryDTOs).Returns(new List<CategoryDTO>()
        {
            new CategoryDTO { Id = 1 }
        });
        _mockDbCrud.Setup(db => db.genderDTOs).Returns(new List<GenderDTO>()
        {
            new GenderDTO { Id = 1 }
        });
        _mockDbCrud.Setup(db => db.statusDTOs).Returns(new List<StatusDTO>()
        {
            new StatusDTO { Id = 1 }
        });

        // Act
        var result = await _controller.PostDoctor(doctor);

        // Assert
        var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var returnedDoctor = Assert.IsType<DoctorDTO>(createdAtActionResult.Value);
        Assert.Equal(1, returnedDoctor.Id);
    }

    [Fact]
    public async Task PutDoctor()
    {
        // Arrange
        var doctor = new DoctorDTO
        {
            Id = 1,
            Area = new AreaDTO { Id = 1 },
            Category = new CategoryDTO { Id = 1 },
            DateOfBirth = new DateOnly(),
            FirstName = "asd",
            LastName = "adasd",
            Surname = "sad",
            Gender = new GenderDTO { Id = 1 },
            Specialization = new SpecializationDTO() { Id = 1 },
            Status = new StatusDTO { Id = 1 }
        };
        _mockDbCrud.Setup(db => db.Save()).Returns(Task.CompletedTask);
        _mockDbCrud.Setup(db => db.UpdateDoctor(It.IsAny<DoctorDTO>())).Verifiable();
        _mockDbCrud.Setup(db => db.doctorDTOs).Returns(new List<DoctorDTO> { doctor });
        _mockDbCrud.Setup(db => db.specializationDTOs).Returns(new List<SpecializationDTO>()
        {
            new SpecializationDTO { Id = 1}
        });
        _mockDbCrud.Setup(db => db.areaDTOs).Returns(new List<AreaDTO>()
        {
            new AreaDTO { Id = 1 }
        });
        _mockDbCrud.Setup(db => db.categoryDTOs).Returns(new List<CategoryDTO>()
        {
            new CategoryDTO { Id = 1 }
        });
        _mockDbCrud.Setup(db => db.genderDTOs).Returns(new List<GenderDTO>()
        {
            new GenderDTO { Id = 1 }
        });
        _mockDbCrud.Setup(db => db.statusDTOs).Returns(new List<StatusDTO>()
        {
            new StatusDTO { Id = 1 }
        });

        // Act
        var result = await _controller.PutDoctor(1, doctor);

        // Assert
        var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
        var returnedDoctor = Assert.IsType<DoctorDTO>(createdAtActionResult.Value);
        Assert.Equal(1, returnedDoctor.Id); 
    }

    [Fact]
    public async Task DeleteDoctor()
    {
        // Arrange
        var doctorId = 1;
        var doctor = new DoctorDTO
        {
            Id = 1,
            Area = new AreaDTO { Id = 1 },
            Category = new CategoryDTO { Id = 1 },
            DateOfBirth = new DateOnly(),
            FirstName = "asd",
            LastName = "adasd",
            Surname = "sad",
            Gender = new GenderDTO { Id = 1 },
            Specialization = new SpecializationDTO() { Id = 1 },
            Status = new StatusDTO { Id = 1 }
        };
        _mockDbCrud.Setup(db => db.doctorDTOs).Returns(new List<DoctorDTO> { doctor });
        _mockDbCrud.Setup(db => db.DeleteDoctor(1)).Verifiable(); // Мокаем удаление
        _mockDbCrud.Setup(db => db.Save()).Returns(Task.CompletedTask);

        // Act
        var result = await _controller.Delete(1);

        // Assert
        var okResult = Assert.IsType<OkResult>(result); // Проверка, что возвращен статус 200 OK
        _mockDbCrud.Verify(db => db.DeleteDoctor(1), Times.Once); // Проверка, что метод удаления был вызван
    }
}
