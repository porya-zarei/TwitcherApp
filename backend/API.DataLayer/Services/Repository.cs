namespace API.DataLayer.Services
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly MainContext _context;
        internal DbSet<T> _set;

        public Repository(MainContext context)
        {
            _context = context;
            _set = context.Set<T>();
        }

        public async Task<T> AddEntryAsync(T entry)
        {
            await _set.AddAsync(entry);
            await SaveAsync();
            return entry;
        }

        public void AddEntry(T entry)
        {
            _set.Add(entry);
            Save();
        }

        public void DeleteEntry(Guid entryId)
        {
            var entry = GetEntry(entryId);
            if (entry != null)
            {
                _set.Remove(entry);
                Save();
            }
        }

        public async Task<ICollection<T>> GetAllEntries()
        {
            return await _set.ToListAsync();
        }

        public T? GetEntry(Guid id)
        {
            return _set.Find(id);
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void UpdateEntry(T entry)
        {
            _set.Update(entry);
        }
    }
}
