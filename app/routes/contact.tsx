import nodemailer from "nodemailer";
import { useState, useEffect } from "react";
import { useFetcher } from "react-router";
import type { Route } from "./+types/layout";
import ContactHtml from "~/assets/contact-template.html?raw";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent !== "submit-contact") return null;

  try {
    const name = formData.get("name");
    const company = formData.get("company");
    const email = formData.get("email");
    const interest = formData.get("interest");
    const message = formData.get("message");

    if (!name || !company || !email || !interest || !message) {
      return { error: "Please fill out all fields." };
    }

    const requiredEnvVars = [
      "VITE_SMTP_HOST",
      "VITE_SMTP_PORT",
      "VITE_SMTP_USER",
      "VITE_SMTP_PASS",
      "VITE_SMTP_USER2",
      "VITE_SMTP_SECURE",
    ];
    for (const key of requiredEnvVars) {
      if (!import.meta.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
      }
    }

    const transporter = nodemailer.createTransport({
      host: import.meta.env.VITE_SMTP_HOST,
      port: Number(import.meta.env.VITE_SMTP_PORT),
      secure:
        import.meta.env.VITE_SMTP_SECURE?.toString().toLowerCase() === "true",
      auth: {
        user: import.meta.env.VITE_SMTP_USER,
        pass: import.meta.env.VITE_SMTP_PASS,
      },
    });

    console.log("Sending email...");

    await transporter.sendMail({
      from: {
        name: import.meta.env.VITE_SMTP_NAME ?? "Contact Form",
        address: import.meta.env.VITE_SMTP_USER!,
      },
      to: import.meta.env.VITE_SMTP_USER2,
      subject: `Contact Form`,
      text: `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nInterest: ${interest}\nMessage: ${message}`,
    });

    console.log("Email sent to admin.");
    console.log("Sending email to user...");

    transporter
      .sendMail({
        from: {
          name: import.meta.env.VITE_SMTP_NAME ?? "HoneyJar",
          address: import.meta.env.VITE_SMTP_USER!,
        },
        to: email as string,
        subject: `Thanks for reaching out`,
        html: ContactHtml,
      })
      .catch((err) => {
        console.warn("Failed to send acknowledgment email to user:", err);
      });

    console.log("Contact form submitted: ", {
      name,
      company,
      email,
      interest,
      message,
    });

    return { success: true };
  } catch (err) {
    console.error(JSON.stringify(err));
    return { error: "Something went wrong. Please try again later." };
  }
}

export default function Contact() {
  const fetcher = useFetcher();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    interest: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const isSubmitting = fetcher.state === "submitting";
  const error = fetcher.data?.error;

  useEffect(() => {
    if (error) {
      setSuccessMessage("");
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (fetcher.data?.success) {
      setFormData({
        name: "",
        company: "",
        email: "",
        interest: "",
        message: "",
      });
      setSuccessMessage("Thanks for reaching out! We’ll get back to you soon.");
    }
  }, [fetcher.data]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      <h1 className="mt-4 text-2xl md:text-5xl">Contact Us</h1>

      <div className="mt-8 max-w-4xl">
        <fetcher.Form method="post">
          <input type="hidden" name="intent" value="submit-contact" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label>
                Full Name <span>*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="bg-transparent outline-none border border-muted focus:border-foreground p-2"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>
                Company Name <span>*</span>
              </label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company"
                className="bg-transparent outline-none border border-muted focus:border-foreground p-2"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>
                Company Email <span>*</span>
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="bg-transparent outline-none border border-muted focus:border-foreground p-2"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>
                What are you looking for? <span>*</span>
              </label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="bg-transparent outline-none border border-muted focus:border-foreground p-2"
                required
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="web">Web solution</option>
                <option value="mobile">Mobile app</option>
                <option value="other">Something else</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label>Write your message</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your project"
                className="bg-transparent outline-none border border-muted focus:border-foreground p-2 resize-none"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group px-6 py-3 flex items-center gap-1 text-primary-foreground bg-primary text-base font-medium hover:shadow-md transition hover:scale-110 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>

            {successMessage && (
              <p className="mt-4 text-green-600">{successMessage}</p>
            )}

            {error && <p className="mt-4 text-red-600">{error}</p>}
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
}
