"use client";

import { useState, useMemo, useEffect } from "react";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { useChainId, useConfig, useAccount, useWriteContract } from "wagmi";
import { chainsToTSender, erc20Abi, tsenderAbi } from "@/constants/index";
import { InputForm } from "./UI/InputField";
import { calculateTotal, parseInput } from "@/utils";
import { FormState } from "./types";
import { Loader } from "./Loader";

export const AirDropForm = () => {
  const [form, setForm] = useState<FormState>(() => {
    if (typeof window === "undefined") {
      return { tokenAddress: "", recipients: "", amounts: "" };
    }

    const saved = localStorage.getItem("tsender-form");
    return saved
      ? JSON.parse(saved)
      : { tokenAddress: "", recipients: "", amounts: "" };
  });

  const chainId = useChainId() || 1;
  const config = useConfig();
  const account = useAccount();

  const total: number = useMemo(
    () => calculateTotal(form.amounts),
    [form.amounts]
  );

  const { data: hash, isPending, writeContractAsync } = useWriteContract();

  useEffect(() => {
    localStorage.setItem("tsender-form", JSON.stringify(form));
  }, [form]);

  const handleChange =
    (field: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      };

  const getApprovedAmount = async (
    tSenderAddress: string | null
  ): Promise<number | undefined> => {
    if (!tSenderAddress) {
      console.error("T-Sender address not found for the current chain");
      return 0;
    }

    const response = await readContract(config, {
      abi: erc20Abi,
      address: form.tokenAddress as `0x${string}`,
      functionName: "allowance",
      args: [account.address, tSenderAddress as `0x${string}`],
    });

    return response as number;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const recipientsArray = parseInput(form.recipients);
    const amountsArray = parseInput(form.amounts);

    if (recipientsArray.length !== amountsArray.length) {
      console.error("Recipients and amounts length mismatch");
      return;
    }

    const tSenderAddress = chainsToTSender[chainId]["tsender"];
    const approvedAmount = (await getApprovedAmount(tSenderAddress)) || 0;

    try {
      if (approvedAmount < total) {
        const approvalHash = await writeContractAsync({
          abi: erc20Abi,
          address: form.tokenAddress as `0x${string}`,
          functionName: "approve",
          args: [tSenderAddress as `0x${string}`, BigInt(total)],
        });

        await waitForTransactionReceipt(config, {
          hash: approvalHash,
        });
      }

      await writeContractAsync({
        abi: tsenderAbi,
        address: tSenderAddress as `0x${string}`,
        functionName: "airdropERC20",
        args: [
          form.tokenAddress,
          recipientsArray,
          amountsArray,
          BigInt(total),
        ],
      });

      localStorage.removeItem("tsender-form");
      setForm({
        tokenAddress: "",
        recipients: "",
        amounts: "",
      });

    } catch (err) {
      console.error("Transaction failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-10 bg-white rounded-2xl shadow-lg border border-zinc-100"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-zinc-900">
          T-Sender
        </h2>
        <p className="text-sm font-semibold text-zinc-500 mt-1">
          Send tokens to multiple addresses efficiently
        </p>
      </div>

      <div className="space-y-4">
        <InputForm
          label="Token Address"
          placeholder="0x"
          value={form.tokenAddress}
          onChange={handleChange("tokenAddress")}
        />
        <InputForm
          label="Recipients (comma or new line separated)"
          placeholder="0x123..., 0x456..."
          value={form.recipients}
          onChange={handleChange("recipients")}
          large={true}
        />
        <InputForm
          label="Amounts (wei; comma or new line separated)"
          placeholder="100, 200, 300..."
          value={form.amounts}
          onChange={handleChange("amounts")}
          large={true}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-6 w-full bg-indigo-600 flex items-center justify-center gap-5 text-white py-3 rounded-xl font-medium shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all disabled:opacity-70"
      >
        {isPending && <Loader />}
        {isPending ? "Confirming in wallet..." : "Send Tokens"}
      </button>
    </form>
  );
};