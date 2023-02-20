using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.services
{
    public class GuestService: IGuestService
    {
         public IGuestRepository _repository;
         public GuestService(IGuestRepository repository)
        {
            _repository = repository;
        }
        public IEnumerable<Guest> GetFilterGuest(int? pagenumber, int? rowsofpage, string? search, string? sort)
        {
            return _repository.GetFilterGuest(pagenumber, rowsofpage, search, sort);
        }
        public string? CreateGuest(Guest guest)
        {
            return _repository.CreateGuest(guest);
        }
        public string? UpdateGuest(Guest guest)
        {
            return _repository.UpdateGuest(guest);
        }
        public string? DeleteGuest(string? khid)
        {
            return _repository.DeleteGuest(khid);
        }
    }
}
