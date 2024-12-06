using Application.DTOs;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Infrastructure;
using Domain.DomainModels;
using Moq;
using Polyclinic_ASP.Controllers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc;

public class ProcedureControllerTests
{
    private readonly Mock<IDbCrud> _mockDbCrud;
    private readonly ProceduresController _controller;

    public ProcedureControllerTests()
    {
        _mockDbCrud = new Mock<IDbCrud>();
        _controller = new ProceduresController(_mockDbCrud.Object);
    }

    [Fact]
    public async Task GetProcedures()
    {
        // Arrange
        var expectedProcedures = new List<ProcedureDTO>
        {
            new ProcedureDTO { Id = 1, Name = "1" },
            new ProcedureDTO { Id = 2, Name = "2" }
        };

        _mockDbCrud.Setup(db => db.procedureDTOs).Returns(expectedProcedures);

        // Act
        var result = await _controller.GetProcedures();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnValue = Assert.IsType<List<ProcedureDTO>>(okResult.Value);
        Assert.Equal(expectedProcedures.Count, returnValue.Count);
    }
}

