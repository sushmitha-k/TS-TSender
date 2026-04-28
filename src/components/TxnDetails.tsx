import { useEffect, useState } from "react";
import { LabelElementProps } from "./types";

type FormState = {
  tokenAddress: string;
  recipients: string;
  amounts: string;
};

export const LabelElement = ({ label, value }: LabelElementProps) => { return ( <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 shadow-sm"> <label className="text-sm text-gray-500">{label}</label> <p className="text-sm font-semibold text-gray-900 break-all"> {value || "-"} </p> </div> ); };

export const TxnDetails = () => {
  const [parsed, setParsed] = useState<FormState>({
    tokenAddress: "",
    recipients: "",
    amounts: "",
  });

  useEffect(() => {
    const loadData = () => {
      try {
        const saved = localStorage.getItem("tsender-form");
        if (saved) {
          setParsed(JSON.parse(saved));
        }
      } catch {
        setParsed({
          tokenAddress: "",
          recipients: "",
          amounts: "",
        });
      }
    };

    loadData();
    window.addEventListener("storage", loadData);

    return () => {
      window.removeEventListener("storage", loadData);
    };
  }, []);

  const details = [
    { label: "Token Address", value: parsed.tokenAddress },
    { label: "Recipients", value: parsed.recipients },
    { label: "Amounts", value: parsed.amounts },
  ];

  return (
    <div className="mt-6 p-10 bg-white rounded-2xl shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Transaction Details
      </h3>

      <div className="flex flex-col gap-3">
        {details.map((item, index) => (
          <LabelElement
            key={index}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
    </div>
  );
};