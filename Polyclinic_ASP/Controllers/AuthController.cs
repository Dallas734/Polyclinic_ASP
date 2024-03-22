using Application.DTOs;
using Application.Interfaces.Services;
using Domain.DomainModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Polyclinic_ASP.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IDbCrud dbCrud;
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public AuthController(IDbCrud dbCrud, SignInManager<User> signInManager, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            this.dbCrud = dbCrud;
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        [Route("api/register")]
        [HttpPost]
        public async Task<IActionResult> Register(RegisterDTO registerDTO)
        {
            if (ModelState.IsValid)
            {
                User user = new()
                {
                    UserName = registerDTO.Email,
                    Email = registerDTO.Email,
                    DoctorId = registerDTO.DoctorId,
                };

                if (registerDTO.DoctorId != null && dbCrud.doctorDTOs.Find(d => d.Id == registerDTO.DoctorId) == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        new { message = "Ошибка", error = "Уникальный код неверен" });
                }

                if (await roleManager.RoleExistsAsync(registerDTO.Role))
                {

                    var result = await userManager.CreateAsync(user, registerDTO.Password);

                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, registerDTO.Role);
                        await signInManager.SignInAsync(user, false);

                        return Ok(new { message = "Добавлен новый пользователь: " + user.UserName });
                    }
                    else
                    {
                        foreach (var item in result.Errors)
                        {
                            ModelState.AddModelError("", item.Description);
                        }
                        var errorMsg = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage));
                        return BadRequest(new { message = "Ошибка", error = errorMsg });
                    }

                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        new { message = "Ошибка", error = "Роли не существует" });
                }             
            }
            else
            {
                var errorMsg = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage));
                return Unauthorized(errorMsg);
            }
        }

        [Route("api/login")]
        [HttpPost]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            if (ModelState.IsValid)
            {
                var result = await signInManager.PasswordSignInAsync(loginDTO.Email, loginDTO.Password, loginDTO.RememberMe, false);

                if (result.Succeeded)
                {
                    User? user = await userManager.GetUserAsync(HttpContext.User);
                    IEnumerable<string> roles = await userManager.GetRolesAsync(user);
                    UserDTO responseUser = new UserDTO()
                    {
                        Username = user.UserName,
                        Email = user.UserName,
                        DoctorId = user.DoctorId,
                        Roles = roles
                    };
                    return Ok(new { message = "Выполнен вход " + loginDTO.Email,  responseUser });
                }
                else
                {
                    ModelState.AddModelError("", "Неправильный логин и (или) пароль");
                    var errorMsg = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage));
                    return Unauthorized(new { message = errorMsg });
                }
            }
            else
            {
                var errorMsg = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage));
                return Unauthorized(new { message = errorMsg });
            }
        }

        [HttpPost]
        [Route("api/logoff")]
        public async Task<IActionResult> LogOff()
        {
            User? usr = await userManager.GetUserAsync(HttpContext.User);
            if (usr == null)
            {
                return Unauthorized(new { message = "Сначала выполните вход" });
            }
            // Удаление куки
            await signInManager.SignOutAsync();
            return Ok(new { message = "Выполнен выход " + usr.UserName });
        }

        [HttpGet]
        [Route("api/isauthenticated")]
        public async Task<IActionResult> IsAuthenticated()
        {
            User? user = await userManager.GetUserAsync(HttpContext.User);
            if (user == null)
                return Unauthorized(new { message = "Вы Гость. Пожалуйста, выполните вход", responseUser = user });
            IEnumerable<string> roles = await userManager.GetRolesAsync(user);
            UserDTO responseUser = new UserDTO()
            {
                Username = user.UserName,
                Email = user.UserName,
                DoctorId = user.DoctorId,
                Roles = roles
            };
            return Ok(new { message = "Пользователь " + user.UserName, responseUser});
        }
    }
}
