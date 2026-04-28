import { AirDropForm } from "./AirDropForm";
import { TxnDetails } from "./TxnDetails";

export const HomeContent = () => {
    return <div className="flex flex-col grow px-20">
        <AirDropForm />
        <TxnDetails />
    </div>
};