using Domain.DomainModels;
using Infrastructure;

namespace WebAPI.Data
{
    public class PolyclinicContextSeed
    {
        public static async Task SeedAsync(PolyclinicKurContext context)
        {
            try
            {
                //context.Database.EnsureDeleted();

                if (context.Doctors.Any())
                {
                    return;
                }

                var specializations = new Specialization[]
                {
                    new Specialization {Name="Терапевт"},
                    new Specialization {Name="Вирусолог"},
                    new Specialization {Name="Кардиолог"},
                    new Specialization {Name="Дерматолог"},
                    new Specialization {Name="Офтальмолог"},
                    new Specialization {Name="Хирург"}
                };

                foreach (Specialization s in specializations)
                {
                    context.Specializations.Add(s);
                }

                await context.SaveChangesAsync();

                var areas = new Area[]
                {
                    new Area {Id = 7, Type="Общей практики"},
                    new Area {Id = 8, Type="Общей практики"},
                    new Area {Id = 14, Type="Хирургический"},
                    new Area {Id = 23, Type="Комплексный"}
                };

                foreach (Area area in areas)
                {
                    context.Areas.Add(area);
                }

                await context.SaveChangesAsync();

            }
            catch
            {
                throw;
            }
        }
    }
}

