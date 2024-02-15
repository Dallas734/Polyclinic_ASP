using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.DomainModels;

namespace Application.DTOs
{
    public class AreaDTO
    {
        public AreaDTO()
        {
        }

        public AreaDTO(Area a)
        {
            Id = a.Id;
            Type = a.Type;
            //Addresses = new ObservableCollection<AddressDTO>(context.addressDTOs.Where(i => i.AreaId == Id).ToList());
        }

        public int Id { get; set; }

        public string Type { get; set; }

        //public ObservableCollection<AddressDTO> Addresses { get; set; }
    }
}
