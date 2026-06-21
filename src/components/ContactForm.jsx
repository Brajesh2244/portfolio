import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const contactEndpoint = import.meta.env.VITE_CONTACT_API_URL || "/api/contact";

function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Message could not be sent right now.");
      }

      event.currentTarget.reset();
      setStatus("sent");
    } catch (requestError) {
      setStatus("error");
      setError(requestError.message);
    }
  };

  return (
    <motion.form
      className="glass-panel reveal"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65 }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label">
          Name
          <input name="name" className="field-input" type="text" autoComplete="name" required minLength={2} />
        </label>
        <label className="field-label">
          Email
          <input name="email" className="field-input" type="email" autoComplete="email" required />
        </label>
      </div>
      <label className="field-label mt-5">
        Message
        <textarea name="message" className="field-input min-h-40 resize-y" required minLength={10} />
      </label>
      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button className="primary-button w-full justify-center sm:w-auto" type="submit" disabled={status === "sending"}>
          <Send size={18} />
          {status === "sending" ? "Sending" : "Send Message"}
        </button>
        <p className="min-h-6 text-sm text-white/58" role="status">
          {status === "sent" && "Message transmitted successfully."}
          {status === "error" && (error || "Backend API is not available yet.")}
        </p>
      </div>
    </motion.form>
  );
}

export default ContactForm;
