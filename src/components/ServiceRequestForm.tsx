"use client";

import { useActionState, useMemo, useState } from "react";
import Link from "next/link";
import {
  submitServiceRequest,
  type ServiceRequestFormState,
} from "@/app/servis-talep/actions";

interface BrandOption {
  id: string;
  name: string;
  faults: { title: string }[];
  models: { id: string; name: string }[];
}

interface ProvinceOption {
  id: string;
  name: string;
}

const STEP_LABELS = ["Marka & Model", "Arıza", "Müşteri Bilgileri", "Özet & Onay"];

const initialState: ServiceRequestFormState = { status: "idle" };

export function ServiceRequestForm({
  brands,
  provinces,
}: {
  brands: BrandOption[];
  provinces: ProvinceOption[];
}) {
  const [state, formAction, isPending] = useActionState(
    submitServiceRequest,
    initialState,
  );

  const [step, setStep] = useState(1);
  const [brandId, setBrandId] = useState("");
  const [modelChoice, setModelChoice] = useState(""); // model id, or "other", or ""
  const [modelNameOther, setModelNameOther] = useState("");
  const [faultDescription, setFaultDescription] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [kvkkConsent, setKvkkConsent] = useState(false);

  const selectedBrand = useMemo(
    () => brands.find((b) => b.id === brandId) ?? null,
    [brands, brandId],
  );

  const errors = state.status === "error" ? state.errors ?? {} : {};

  const stepValid: Record<number, boolean> = {
    1: brandId !== "" && (modelChoice !== "other" || modelNameOther.trim().length > 0),
    2: faultDescription.trim().length >= 10,
    3:
      customerName.trim().length >= 2 &&
      /^[0-9+()\s-]{10,20}$/.test(customerPhone.trim()) &&
      provinceId !== "" &&
      addressLine.trim().length >= 10,
    4: kvkkConsent,
  };

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-brand-200 bg-brand-50 p-6 text-center">
        <h2 className="text-xl font-bold text-brand-900">
          Servis talebiniz alındı!
        </h2>
        <p className="mt-2 text-brand-800">
          Takip kodunuz: <span className="font-mono font-bold">{state.trackingCode}</span>
        </p>
        <p className="mt-2 text-sm text-brand-800">
          Bu kodu not edin — cihazınızın durumunu{" "}
          <Link href={`/servis-takip?kod=${state.trackingCode}`} className="underline">
            kargo takip sayfamızdan
          </Link>{" "}
          sorgulayabilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate>
      <ol className="mb-8 flex flex-wrap gap-2 text-xs font-medium text-slate-500" aria-label="Form adımları">
        {STEP_LABELS.map((label, index) => {
          const stepNumber = index + 1;
          const isCurrent = step === stepNumber;
          return (
            <li
              key={label}
              aria-current={isCurrent ? "step" : undefined}
              className={`rounded-full px-3 py-1 ${
                isCurrent
                  ? "bg-brand-700 text-white"
                  : stepNumber < step
                    ? "bg-brand-100 text-brand-800"
                    : "bg-slate-100"
              }`}
            >
              {stepNumber}. {label}
            </li>
          );
        })}
      </ol>

      {/* Step 1: Brand & Model */}
      <fieldset className={step === 1 ? "space-y-4" : "hidden"}>
        <legend className="text-lg font-semibold text-slate-900">
          Marka ve Model
        </legend>
        <div>
          <label htmlFor="brandId" className="block text-sm font-medium text-slate-700">
            Marka *
          </label>
          <select
            id="brandId"
            name="brandId"
            required
            value={brandId}
            onChange={(e) => {
              setBrandId(e.target.value);
              setModelChoice("");
            }}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="">Marka seçin…</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          {errors.brandId && (
            <p className="mt-1 text-sm text-red-600">{errors.brandId}</p>
          )}
        </div>

        {selectedBrand && (
          <div>
            <label htmlFor="modelChoice" className="block text-sm font-medium text-slate-700">
              Model
            </label>
            <select
              id="modelChoice"
              value={modelChoice}
              onChange={(e) => setModelChoice(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            >
              <option value="">Model seçin (opsiyonel)…</option>
              {selectedBrand.models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
              <option value="other">Listede yok / emin değilim</option>
            </select>
            {modelChoice === "other" && (
              <input
                type="text"
                autoComplete="off"
                placeholder="Model adını yazın (biliyorsanız)"
                value={modelNameOther}
                onChange={(e) => setModelNameOther(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            )}
          </div>
        )}
        {/* Hidden field carrying the resolved free-text model name to the server action */}
        <input
          type="hidden"
          name="modelName"
          value={
            modelChoice === "other"
              ? modelNameOther
              : (selectedBrand?.models.find((m) => m.id === modelChoice)?.name ?? "")
          }
        />

        <div className="flex justify-end">
          <button
            type="button"
            disabled={!stepValid[1]}
            onClick={() => setStep(2)}
            className="rounded-full bg-brand-700 px-6 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            İleri
          </button>
        </div>
      </fieldset>

      {/* Step 2: Fault */}
      <fieldset className={step === 2 ? "space-y-4" : "hidden"}>
        <legend className="text-lg font-semibold text-slate-900">Arıza Bilgisi</legend>

        {selectedBrand && selectedBrand.faults.length > 0 && (
          <div>
            <p className="text-sm font-medium text-slate-700">
              Sık karşılaşılan arızalardan seçebilirsiniz:
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedBrand.faults.map((f) => (
                <button
                  key={f.title}
                  type="button"
                  onClick={() =>
                    setFaultDescription((prev) =>
                      prev.includes(f.title) ? prev : (prev ? `${prev}\n${f.title}` : f.title),
                    )
                  }
                  className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:border-brand-500 hover:text-brand-800"
                >
                  + {f.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label htmlFor="faultDescription" className="block text-sm font-medium text-slate-700">
            Arıza açıklaması *
          </label>
          <textarea
            id="faultDescription"
            name="faultDescription"
            required
            minLength={10}
            rows={5}
            value={faultDescription}
            onChange={(e) => setFaultDescription(e.target.value)}
            aria-describedby="faultDescription-hint"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <p id="faultDescription-hint" className="mt-1 text-xs text-slate-500">
            Cihazınızda gözlemlediğiniz sorunu olabildiğince ayrıntılı yazın.
          </p>
          {errors.faultDescription && (
            <p className="mt-1 text-sm text-red-600">{errors.faultDescription}</p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700"
          >
            Geri
          </button>
          <button
            type="button"
            disabled={!stepValid[2]}
            onClick={() => setStep(3)}
            className="rounded-full bg-brand-700 px-6 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            İleri
          </button>
        </div>
      </fieldset>

      {/* Step 3: Customer info */}
      <fieldset className={step === 3 ? "space-y-4" : "hidden"}>
        <legend className="text-lg font-semibold text-slate-900">
          Müşteri Bilgileri
        </legend>

        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-slate-700">
            Ad Soyad *
          </label>
          <input
            id="customerName"
            name="customerName"
            type="text"
            autoComplete="name"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          {errors.customerName && (
            <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
          )}
        </div>

        <div>
          <label htmlFor="customerPhone" className="block text-sm font-medium text-slate-700">
            Telefon *
          </label>
          <input
            id="customerPhone"
            name="customerPhone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="05XX XXX XX XX"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          {errors.customerPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.customerPhone}</p>
          )}
        </div>

        <div>
          <label htmlFor="provinceId" className="block text-sm font-medium text-slate-700">
            İl *
          </label>
          <select
            id="provinceId"
            name="provinceId"
            required
            autoComplete="address-level1"
            value={provinceId}
            onChange={(e) => setProvinceId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="">İl seçin…</option>
            {provinces.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.provinceId && (
            <p className="mt-1 text-sm text-red-600">{errors.provinceId}</p>
          )}
        </div>

        <div>
          <label htmlFor="addressLine" className="block text-sm font-medium text-slate-700">
            Adres *
          </label>
          <textarea
            id="addressLine"
            name="addressLine"
            required
            minLength={10}
            rows={3}
            autoComplete="street-address"
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          {errors.addressLine && (
            <p className="mt-1 text-sm text-red-600">{errors.addressLine}</p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700"
          >
            Geri
          </button>
          <button
            type="button"
            disabled={!stepValid[3]}
            onClick={() => setStep(4)}
            className="rounded-full bg-brand-700 px-6 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            İleri
          </button>
        </div>
      </fieldset>

      {/* Step 4: Review & consent */}
      <fieldset className={step === 4 ? "space-y-4" : "hidden"}>
        <legend className="text-lg font-semibold text-slate-900">Özet ve Onay</legend>

        <dl className="space-y-2 rounded-lg bg-slate-50 p-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Marka</dt>
            <dd className="font-medium text-slate-800">{selectedBrand?.name ?? "-"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Ad Soyad</dt>
            <dd className="font-medium text-slate-800">{customerName || "-"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Telefon</dt>
            <dd className="font-medium text-slate-800">{customerPhone || "-"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">İl</dt>
            <dd className="font-medium text-slate-800">
              {provinces.find((p) => p.id === provinceId)?.name ?? "-"}
            </dd>
          </div>
        </dl>

        <div className="flex items-start gap-2">
          <input
            id="kvkkConsent"
            name="kvkkConsent"
            type="checkbox"
            checked={kvkkConsent}
            onChange={(e) => setKvkkConsent(e.target.checked)}
            className="mt-1 h-4 w-4"
          />
          <label htmlFor="kvkkConsent" className="text-sm text-slate-700">
            <Link href="/kvkk-aydinlatma-metni" className="underline">
              KVKK Aydınlatma Metni
            </Link>
            &apos;ni okudum, kişisel verilerimin servis talebimin
            işlenmesi amacıyla işlenmesini kabul ediyorum. *
          </label>
        </div>
        {errors.kvkkConsent && (
          <p className="text-sm text-red-600">{errors.kvkkConsent}</p>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setStep(3)}
            className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700"
          >
            Geri
          </button>
          <button
            type="submit"
            disabled={!stepValid[4] || isPending}
            className="rounded-full bg-brand-700 px-6 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isPending ? "Gönderiliyor…" : "Servis Talebini Gönder"}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
