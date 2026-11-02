"use client";

import emailjs from "@emailjs/browser";
import { AlertTriangle, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const empty = { name: "", email: "", phone: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function update(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      if (!publicKey || !serviceId || !templateId)
        throw new Error("The contact form is not configured");

      emailjs.init(publicKey);
      const res = await emailjs.send(serviceId, templateId, {
        from_name: form.name,
        from_email: form.email,
        phone: form.phone || "Not provided",
        subject: form.subject,
        message: form.message,
        to_name: "Carbn Team",
        reply_to: form.email,
      });
      if (res.status !== 200)
        throw new Error(res.text || "Unexpected response");
      setStatus("sent");
      setForm(empty);
    } catch (err) {
      const text =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err && "text" in err
            ? String(err.text)
            : "Unknown error";
      setError(text);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="border-[1.5px] border-graphite-500 bg-graphite-900 p-8 md:p-12"
      >
        <span className="inline-flex size-11 items-center justify-center border-[1.5px] border-volt bg-volt text-graphite-950">
          <Check className="size-5 stroke-2" aria-hidden />
        </span>
        <h2 className="type-heading mt-8 text-h2 text-graphite-50">
          Message sent
        </h2>
        <p className="mt-3 text-body-lg text-graphite-300">
          Thank you for contacting us. We will get back to you within 24 hours.
        </p>
        <Button
          variant="secondary"
          className="mt-8"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate={false}>
      <div className="grid gap-6 md:grid-cols-2">
        <Field id="name" label="Full name" required>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={70}
            value={form.name}
            onChange={update}
            placeholder="Your full name"
          />
        </Field>
        <Field id="email" label="Email address" required>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={250}
            value={form.email}
            onChange={update}
            placeholder="you@company.com"
          />
        </Field>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Field id="phone" label="Phone number">
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={19}
            value={form.phone}
            onChange={update}
            placeholder="+962 7 0000 0000"
          />
        </Field>
        <Field id="subject" label="Subject" required>
          <Input
            id="subject"
            name="subject"
            required
            maxLength={50}
            value={form.subject}
            onChange={update}
            placeholder="How can we help?"
          />
        </Field>
      </div>
      <Field
        id="message"
        label="Message"
        required
        hint="Up to 1,500 characters."
      >
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={1500}
          value={form.message}
          onChange={update}
          placeholder="Tell us about your on-prem AI needs: hardware, teams, constraints."
        />
      </Field>

      {status === "error" ? (
        <p
          role="alert"
          className="flex items-start gap-3 border-[1.5px] border-fault-dark px-4 py-3 text-body-sm text-fault-dark"
        >
          <AlertTriangle
            className="mt-0.5 size-[18px] shrink-0 stroke-[1.5]"
            aria-hidden
          />
          <span>
            The message could not be sent ({error}). Please try again, or email
            us directly at{" "}
            <a
              href={`mailto:${site.email}`}
              className="underline underline-offset-4"
            >
              {site.email}
            </a>
            .
          </span>
        </p>
      ) : null}

      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending" : "Send message"}
        <ArrowRight aria-hidden />
      </Button>
    </form>
  );
}
