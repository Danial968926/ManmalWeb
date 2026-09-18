"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";

const PLACEHOLDER_IMG = "/products/placeholder.jpg";

export default function ProductForm({
  initial,
  categories,
  onSave,
  onCancel,
}: {
  initial: Product | null;
  categories: { id: number; name: string }[];
  onSave: (formData: FormData) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  
const [categoryId, setCategoryId] = useState(() => {
    if (initial?.cat && categories?.length > 0) {
      const found = categories.find((c) => c.name === initial.cat);
      if (found) return found.id.toString();
    }
    return categories?.length > 0 ? categories[0].id.toString() : "1";
  });

  const [price, setPrice] = useState(initial ? String(initial.price) : "");
  const [was, setWas] = useState(initial?.was ? String(initial.was) : "");
  const [tag, setTag] = useState(initial?.tag ?? "");
  const [blurb, setBlurb] = useState(initial?.blurb ?? "");
  const [makes, setMakes] = useState(initial?.makes ?? "");
  const [time, setTime] = useState(initial?.time ?? "");
  const [level, setLevel] = useState(initial?.level ?? "Beginner");
  const [includes, setIncludes] = useState(initial?.includes.join(", ") ?? "");
  
  // Image handling for file upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initial?.img ?? PLACEHOLDER_IMG);
  const [submitting, setSubmitting] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    e.target.value = "";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("CategoryId", categoryId);
    formData.append("Price", price);
    if (was) formData.append("WasPrice", was);
    if (tag) formData.append("Tag", tag);
    formData.append("Blurb", blurb);
    formData.append("Makes", makes);
    formData.append("Time", time);
    formData.append("Level", level);
    formData.append("Includes", includes);
    
    if (imageFile) {
      formData.append("Image", imageFile);
    }

    await onSave(formData);
    setSubmitting(false);
  }

  const inputCls =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors duration-150 focus:border-ring";

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-5 shadow-xs">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-3">
          <Field label="Image">
            <div className="flex items-center gap-3">
              {imagePreview === PLACEHOLDER_IMG ? (
                <div className="flex size-14 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground">
                  <ImageOff className="size-5" />
                </div>
              ) : (
                <Image
                  src={imagePreview}
                  alt="Product image preview"
                  width={56}
                  height={56}
                  unoptimized={imagePreview.startsWith("blob:") || imagePreview.startsWith("http")}
                  className="size-14 shrink-0 rounded-md border border-border object-cover"
                />
              )}
              <label
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-2 text-sm font-medium transition-colors duration-150 hover:bg-muted"
              >
                <Upload className="size-4" />
                {imagePreview === PLACEHOLDER_IMG ? "Upload image" : "Replace image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="sr-only"
                />
              </label>
              {imagePreview !== PLACEHOLDER_IMG && (
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(PLACEHORN_IMG => PLACEHOLDER_IMG);
                  }}
                  className="inline-flex cursor-pointer items-center gap-1 text-sm text-muted-foreground transition-colors duration-150 hover:text-destructive"
                >
                  <X className="size-4" />
                  Remove
                </button>
              )}
              <span className="hidden text-xs text-muted-foreground sm:block">
                Uploads directly to Cloudflare R2 storage.
              </span>
            </div>
          </Field>
        </div>

        <div className="lg:col-span-2">
          <Field label="Name">
            <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
          </Field>
        </div>

        <Field label="Category">
          <select
  value={categoryId}
  onChange={(e) => setCategoryId(e.target.value)}
  className={`${inputCls} cursor-pointer`}
>
  {categories?.map((c) => (
    <option key={c.id} value={c.id}>
      {c.name}
    </option>
  )) ?? <option value="1">Loading categories...</option>}
</select>
        </Field>

        <Field label="Level">
          <select value={level} onChange={(e) => setLevel(e.target.value)} className={`${inputCls} cursor-pointer`}>
            <option>Beginner</option>
            <option>Improver</option>
          </select>
        </Field>

        <Field label="Price (Rs.)">
          <input
            required
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Was (optional)">
          <input
            type="number"
            min={0}
            value={was}
            onChange={(e) => setWas(e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Tag (optional)">
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Bestseller, New, Limited…"
            className={inputCls}
          />
        </Field>

        <Field label="Time">
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="3-5 hrs"
            className={inputCls}
          />
        </Field>

        <Field label="Makes">
          <input
            value={makes}
            onChange={(e) => setMakes(e.target.value)}
            placeholder="Makes 1 canvas (40×50cm)"
            className={inputCls}
          />
        </Field>

        <div className="sm:col-span-2 lg:col-span-3">
          <Field label="Blurb">
            <textarea
              required
              rows={2}
              value={blurb}
              onChange={(e) => setBlurb(e.target.value)}
              className={`${inputCls} resize-none`}
            />
          </Field>
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <Field label="Includes (comma separated)">
            <textarea
              rows={2}
              value={includes}
              onChange={(e) => setIncludes(e.target.value)}
              className={`${inputCls} resize-none`}
            />
          </Field>
        </div>
      </div>

      <div className="mt-5 flex gap-2 border-t border-border pt-4">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : initial ? "Save changes" : "Create product"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}