import { InputField } from "./UI/InputField";

export const AirDropForm = () => {
  return (
    <form className="w-full max-w-xl p-8 bg-white rounded-2xl shadow-lg border border-zinc-100">
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-zinc-900">
          T-Sender
        </h2>
        <p className="text-sm text-zinc-500 mt-1">
          Send tokens to multiple addresses efficiently
        </p>
      </div>

      <div className="space-y-4">
        <InputField
          label="Token Address"
          placeholder="0x..."
        />

        <InputField
          label="Recipients"
          placeholder="0x123..., 0x456..."
          className="min-h-[100px]"
        />

        <InputField
          label="Amounts (wei)"
          placeholder="100, 200, 300..."
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-medium shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all"
      >
        Send Tokens
      </button>
    </form>
  );
};