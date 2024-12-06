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

public class AreasControllerTests
{
    private readonly Mock<IDbCrud> _mockDbCrud;
    private readonly AreasController _controller;

    public AreasControllerTests()
    {
        _mockDbCrud = new Mock<IDbCrud>();
        _controller = new AreasController(_mockDbCrud.Object);
    }

    [Fact]
    public async Task GetAreas()
    {
        // Arrange
        var expectedAreas = new List<AreaDTO>
        {
            new AreaDTO { Id = 1, Type = "Area 1" },
            new AreaDTO { Id = 2, Type = "Area 2" }
        };

        _mockDbCrud.Setup(db => db.areaDTOs).Returns(expectedAreas);

        // Act
        var result = await _controller.GetAreas();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnValue = Assert.IsType<List<AreaDTO>>(okResult.Value);
        Assert.Equal(expectedAreas.Count, returnValue.Count);
    }
}

