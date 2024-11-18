import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import SquareButton from "../components/Button/SquareButton";
import { useNavigate } from "react-router-dom";
import { getCardAll, sendCompany } from "../apis/Mydata";

function CompanySelectPage() {
  const navigate = useNavigate();

  const [selectAll, setSelectAll] = useState(false);
  const [companies, setCompanies] = useState([]);

  const [logos, setLogos] = useState([
    {
      companyNo: 1009,
      logoUrl: "/Hana.svg",
    },
    {
      companyNo: 1005,
      logoUrl: "/Shinhan.svg",
    },
    {
      companyNo: 1001,
      logoUrl: "/KB.svg",
    },
    {
      companyNo: 1006,
      logoUrl: "/Hyundai.svg",
    },
    {
      companyNo: 1002,
      logoUrl: "/Samsung.svg",
    },
  ]);

  const selectAllToggle = () => {
    setSelectAll((prevSelectAll) => {
      const newSelectAll = !prevSelectAll;
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) => ({
          ...company,
          isSelected: newSelectAll,
        }))
      );
      return newSelectAll;
    });
  };

  useEffect(() => {
    getCompanyList();
  }, []);

  const companySelect = (index) => {
    setCompanies((prevCompanies) => {
      const updatedCompanies = prevCompanies.map((company, i) =>
        i === index ? { ...company, isSelected: !company.isSelected } : company
      );

      const allSelected = updatedCompanies.every((company) => company.selected);
      setSelectAll(allSelected);
      return updatedCompanies;
    });
  };

  const getCompanyList = async () => {
    const response = await getCardAll().then((res) => {
      if (res) {
        return res;
      }
    });
    // console.log(response.result);
    if (response) {
      setCompanies(
        response.result.map((company) => {
          const logo = logos.find(
            (logo) => logo.companyNo === Number(company.companyNo)
          );
          return { ...company, logoUrl: logo ? logo.logoUrl : "" };
        })
      );
    }
  };

  const selectedCompany = async () => {
    const companiesSelected = companies.map((company) => {
      return { id: company.companyId, isSelected: company.isSelected };
    });
    const data = {
      companiesSelectedInfos: companiesSelected,
    };
    // console.log(data);
    const response = await sendCompany(data).then((res) => {
      // console.log(res.success);
      if (res) {
        return res.success;
      }
    });
    // console.log(response);
    if (response) {
      navigate("/card-select");
    }
  };

  return (
    <div
      className={css`
        position: relative;
        background-color: #f6f6f6;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100vh;
      `}
    >
      <div
        className={css`
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          bottom: 0;
          width: 100%;
          height: 90%;
          background-color: white;
          border-top-left-radius: 2rem;
          border-top-right-radius: 2rem;
          padding: 2.5rem;
          box-sizing: border-box;
          box-shadow: 0 -4px 10px rgb(0 0 0 / 10%);
        `}
      >
        <div
          className={css`
            width: 100%;
            color: #959595;
            font-size: 1.2rem;
            font-weight: 700;
          `}
        >
          카드사 선택
        </div>
        <div
          className={css`
            width: 100%;
            display: flex;
            align-items: center;
            color: #959595;
            font-size: 1rem;
            justify-content: end;
          `}
        >
          전체선택
          {selectAll ? (
            <img
              className={css`
                margin: 0.5rem;
                cursor: pointer;
              `}
              onClick={selectAllToggle}
              src="/Selected.svg"
              alt=""
            />
          ) : (
            <img
              className={css`
                margin: 0.5rem;
                cursor: pointer;
              `}
              onClick={selectAllToggle}
              src="/Unselected.svg"
              alt=""
            />
          )}
        </div>
        {companies.map((company, index) => (
          <div
            key={index}
            className={css`
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              color: #959595;
              font-size: 1.3rem;
              margin-bottom: 0.5rem;
            `}
          >
            <img
              className={css`
                width: 10%;
              `}
              src={company.logoUrl}
              alt=""
            />
            <div
              className={css`
                width: 70%;
              `}
            >
              {company.companyName}
            </div>
            {company.isSelected ? (
              <img
                className={css`
                  margin: 0.5rem;
                  cursor: pointer;
                `}
                onClick={() => {
                  companySelect(index);
                }}
                src="/Selected.svg"
                alt=""
              />
            ) : (
              <img
                className={css`
                  margin: 0.5rem;
                  cursor: pointer;
                `}
                onClick={() => {
                  companySelect(index);
                }}
                src="/Unselected.svg"
                alt=""
              />
            )}
          </div>
        ))}
        <SquareButton
          name={"다음"}
          marginTop={"3rem"}
          onClick={() => {
            selectedCompany();
          }}
        />
      </div>
    </div>
  );
}
export default CompanySelectPage;
