namespace API.DataLayer.Interfaces;

public interface IRepository<T> where T : class
{
    void AddEntry(T entry);
    Task<T> AddEntryAsync(T entry);
    void DeleteEntry(Guid entryId);
    void UpdateEntry(T entry);
    T? GetEntry(Guid id);
    Task<ICollection<T>> GetAllEntries();

    void Save();
    Task SaveAsync();
}
