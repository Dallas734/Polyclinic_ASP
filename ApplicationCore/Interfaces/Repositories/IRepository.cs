namespace Application.Interfaces.Repositories
{
    public interface IRepository<T> where T : class
    {
        List<T> GetList();
        IEnumerable<T> GetAll();
        T GetItem(int id);
        int Create(T item);
        void Update(T item);
        void Delete(int id);
        void Load();

        void Include(string nameOfTable);
    }
}
