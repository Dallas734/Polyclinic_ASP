/*using iTextSharp.text.pdf;
using iTextSharp.text;*/
using Application.Interfaces.Services;

namespace Infrastructure.Services
{
    public class FileService : IFileService
    {
        /*public void Save(string filename, List<ReportModel> data, string header)
        {
            try
            {
                Document document = new Document();

                PdfWriter.GetInstance(document, new FileStream(filename, FileMode.Create));

                document.Open();

                // Шрифт
                BaseFont baseFont = BaseFont.CreateFont(@"..\..\Resources\TimesNewRomanRegular.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
                Font font = new Font(baseFont, Font.DEFAULTSIZE, Font.NORMAL);

                // Определяем количество столбцов
                PdfPTable table = new PdfPTable(2);

                // Общий заголовок
                PdfPCell cell = new PdfPCell(new Phrase(header, font));

                cell.Colspan = 2;
                cell.HorizontalAlignment = 1;
                cell.Border = 0;
                table.AddCell(cell);

                // Добавляем заголовки таблицы
                table.AddCell(new PdfPCell(new Phrase(new Phrase("Объект", font))));    
                table.AddCell(new PdfPCell(new Phrase(new Phrase("%", font))));

                // дОбавляем данные
                foreach (ReportModel item in data)
                {
                    table.AddCell(new Phrase(item.Name, font));
                    table.AddCell(new Phrase((item.Workload * 100).ToString(), font));
                }

                // Добавляем таблицу в документ
                document.Add(table);

                document.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }*/
    }
}
