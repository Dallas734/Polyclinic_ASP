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

public class CategoriesControllerTests
{
    private readonly Mock<IDbCrud> _mockDbCrud;
    private readonly CategoriesController _controller;

    public CategoriesControllerTests()
    {
        _mockDbCrud = new Mock<IDbCrud>();
        _controller = new CategoriesController(_mockDbCrud.Object);
    }

    [Fact]
    public async Task GetCategories()
    {
        // Arrange
        var expectedCategories = new List<CategoryDTO>
        {
            new CategoryDTO { Id = 1, Name = "1" },
            new CategoryDTO { Id = 2, Name = "2" }
        };

        _mockDbCrud.Setup(db => db.categoryDTOs).Returns(expectedCategories);

        // Act
        var result = await _controller.GetCategories();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnValue = Assert.IsType<List<CategoryDTO>>(okResult.Value);
        Assert.Equal(expectedCategories.Count, returnValue.Count);
    }
}

