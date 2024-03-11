using Microsoft.AspNetCore.Identity;
using Domain.DomainModels;
using Microsoft.Extensions.DependencyInjection;

namespace WebAPI.Data
{
    public class IdentitySeed
    {
        public static async Task CreateUserRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

            // Создание ролей регистратора и пользователя
            if (await roleManager.FindByNameAsync("registrator") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("registrator"));
            }
            if (await roleManager.FindByNameAsync("doctor") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("doctor"));
            }

            // Создание Регистратора
            string regEmail = "registrator@mail.com";
            string regPassword = "Mark_160403";
            if (await userManager.FindByNameAsync(regEmail) == null)
            {
                User registrator = new User { Email = regEmail, UserName = regEmail };
                IdentityResult result = await userManager.CreateAsync(registrator, regPassword);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(registrator, "registrator");
                }
            }

            // Создание Пользователя
            string userEmail = "doctor@mail.com";
            string userPassword = "Mark_160403";
            if (await userManager.FindByNameAsync(userEmail) == null)
            {
                User user = new User { Email = userEmail, UserName = userEmail };
                IdentityResult result = await userManager.CreateAsync(user, userPassword);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, "doctor");
                }
            }
        }
    }
}
