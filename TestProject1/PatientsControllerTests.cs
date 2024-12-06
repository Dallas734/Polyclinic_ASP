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
using Xunit;

public class PatientsControllerTests
{
    private readonly Mock<IDbCrud> _mockDbCrud;
    private readonly PatientsController _controller;
    private readonly Mock<IPatientService> _mockPatientService;

    public PatientsControllerTests()
    {
        _mockDbCrud = new Mock<IDbCrud>();
        _mockPatientService = new Mock<IPatientService>();
        _controller = new PatientsController(_mockDbCrud.Object, _mockPatientService.Object);
    }

    [Fact]
    public async Task GetPatients()
    {
        // Arrange
        var expectedPatients = new List<PatientDTO>
        {
            new PatientDTO { Id = 1,
                FirstName = "asd",
                LastName = "asd",
                DateOfBirth = new DateOnly(),
                Address = "asda",
                Area = new AreaDTO() {Id = 1},
                Gender = new GenderDTO() {Id = 2,},
                Polis = "12313213",
                Surname = "asdad",
                WorkPlace = "adsdad"
            }
        };

        _mockDbCrud.Setup(db => db.patientDTOs).Returns(expectedPatients);

        // Act
        var result = await _controller.GetPatients();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnValue = Assert.IsType<List<PatientDTO>>(okResult.Value);
        Assert.Equal(expectedPatients.Count, returnValue.Count);
    }

    [Fact]
    public async Task PostPatient()
    {
        // Arrange
        var newPatient = new PatientDTO
        {
            Id = 1,
            FirstName = "asd",
            LastName = "asd",
            DateOfBirth = new DateOnly(),
            Address = "asda",
            Area = new AreaDTO() { Id = 1 },
            Gender = new GenderDTO() { Id = 2, },
            Polis = "12313213",
            Surname = "asdad",
            WorkPlace = "adsdad"
        };
        _mockDbCrud.Setup(db => db.AddPatient(It.IsAny<PatientDTO>())).Returns(1); // Метод добавления пациента
        _mockDbCrud.Setup(db => db.Save()).Returns(Task.CompletedTask);
        _mockDbCrud.Setup(db => db.areaDTOs).Returns(new List<AreaDTO> { new AreaDTO() { Id = 1 } });
        _mockDbCrud.Setup(db => db.genderDTOs).Returns(new List<GenderDTO> { new GenderDTO() { Id = 2 } });

        // Act
        var result = await _controller.PostPatient(newPatient);

        // Assert
        var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var returnedPatient = Assert.IsType<PatientDTO>(createdAtActionResult.Value);
        Assert.Equal(1, returnedPatient.Id); // Проверка, что ID пациента правильный
    }

    [Fact]
    public async Task PutPatient()
    {
        // Arrange
        var patient = new PatientDTO
        {
            Id = 1,
            FirstName = "asd",
            LastName = "asd",
            DateOfBirth = new DateOnly(),
            Address = "asda",
            Area = new AreaDTO() { Id = 1 },
            Gender = new GenderDTO() { Id = 2, },
            Polis = "12313213",
            Surname = "asdad",
            WorkPlace = "adsdad"
        };

        _mockDbCrud.Setup(db => db.Save()).Returns(Task.CompletedTask);
        _mockDbCrud.Setup(db => db.UpdatePatient(It.IsAny<PatientDTO>())).Verifiable();
        _mockDbCrud.Setup(db => db.patientDTOs).Returns(new List<PatientDTO> { patient });
        _mockDbCrud.Setup(db => db.areaDTOs).Returns(new List<AreaDTO> { new AreaDTO() { Id = 1 } });
        _mockDbCrud.Setup(db => db.genderDTOs).Returns(new List<GenderDTO> { new GenderDTO() { Id = 2 } });

        // Act
        var result = await _controller.PutPatient(1, patient);

        // Assert
        var okResult = Assert.IsType<CreatedAtActionResult>(result);
        var returnedPatient = Assert.IsType<PatientDTO>(okResult.Value);
        Assert.Equal(1, returnedPatient.Id); // Проверка, что ID пациента правильный
    }

    [Fact]
    public async Task DeletePatient()
    {
        // Arrange
        var patientId = 1;
        var patient = new PatientDTO
        {
            Id = 1,
            FirstName = "asd",
            LastName = "asd",
            DateOfBirth = new DateOnly(),
            Address = "asda",
            Area = new AreaDTO() { Id = 1 },
            Gender = new GenderDTO() { Id = 2, },
            Polis = "12313213",
            Surname = "asdad",
            WorkPlace = "adsdad"
        };
        _mockDbCrud.Setup(db => db.patientDTOs).Returns(new List<PatientDTO> { patient });
        _mockDbCrud.Setup(db => db.DeletePatient(1)).Verifiable(); // Мокаем удаление
        _mockDbCrud.Setup(db => db.Save()).Returns(Task.CompletedTask);

        // Act
        var result = await _controller.Delete(1);

        // Assert
        var okResult = Assert.IsType<OkResult>(result); // Проверка, что возвращен статус 200 OK
        _mockDbCrud.Verify(db => db.DeletePatient(1), Times.Once); // Проверка, что метод удаления был вызван
    }
}
