import "../../assets/scss/layout/base/footerBase.scss";
import { useGetAllFooterQuery } from "../../services/footer";
import { useGetAllWebsiteInformationQuery } from "../../services/websiteInformation";

const FooterBase: React.FC = () => {
  const { data: listFooter } = useGetAllFooterQuery();
  const { data: listWebsiteInformation } = useGetAllWebsiteInformationQuery();

  const footerContentLeft =
    listFooter && listFooter.length > 0 ? listFooter[0].content_left : "";

  const footerContentRight =
    listFooter && listFooter.length > 0 ? listFooter[0].content_right : "";

  return (
    <>
      <div className="containerFooter">
        <div className="containerFooter-1">
          <div className="logo">
            <img
              src={
                listWebsiteInformation &&
                listWebsiteInformation.length > 0 &&
                typeof listWebsiteInformation[0]?.logo === "string"
                  ? listWebsiteInformation[0]?.logo
                  : undefined
              }
              alt="Ảnh logo"
            />
            <p className="logo-title">
              {listFooter && listFooter.length > 0 && listFooter[0].slogan}
            </p>
          </div>
          <div className="group18">
            {footerContentLeft && (
              <div
                className="group18"
                dangerouslySetInnerHTML={{ __html: footerContentLeft }}
              />
            )}
          </div>
        </div>
        {footerContentRight && (
          <div
            className="containerFooter-2"
            dangerouslySetInnerHTML={{ __html: footerContentRight }}
          />
        )}
      </div>
      <div className="copyright">
        <p>{listFooter && listFooter.length > 0 && listFooter[0].license}</p>
      </div>
    </>
  );
};
export default FooterBase;
