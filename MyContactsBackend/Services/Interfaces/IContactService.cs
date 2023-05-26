using System.Collections.Generic;
using Utils.Dtos.Contact;

namespace Services.Interfaces
{
    public interface IContactService
    {
        bool CreateContact(ContactCreateRequestDto contactCreateDto);
        List<ContactResponseDto> GetContacts();
        bool UpdateContact(ContactUpdateRequestDto contactUpdateDto);
        bool DeleteContact(int id);
    }
}
