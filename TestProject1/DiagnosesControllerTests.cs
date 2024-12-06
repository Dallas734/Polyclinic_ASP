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

public class DiagnosesControllerTests
{
    private readonly Mock<IDbCrud> _mockDbCrud;
    private readonly DiagnosesController _controller;

    public DiagnosesControllerTests()
    {
        _mockDbCrud = new Mock<IDbCrud>();
        _controller = new DiagnosesController(_mockDbCrud.Object);
    }

    [Fact]
    public async Task GetDiagnoses()
    {
        // Arrange
        var expectedDiagnoses = new List<DiagnosisDTO>
        {
            new DiagnosisDTO { Id = 1, Name = "1" },
            new DiagnosisDTO { Id = 2, Name = "2" }
        };

        _mockDbCrud.Setup(db => db.diagnosisDTOs).Returns(expectedDiagnoses);

        // Act
        var result = await _controller.GetDiagnoses();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnValue = Assert.IsType<List<DiagnosisDTO>>(okResult.Value);
        Assert.Equal(expectedDiagnoses.Count, returnValue.Count);
    }
}
