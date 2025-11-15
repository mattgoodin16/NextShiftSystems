"use client";
export default function Contact() {
  return (
    <section>
      <div className="container max-w-2xl">
        <h1 className="text-3xl font-bold text-navy">Contact</h1>
        <p className="mt-4 text-gray-700">
          Have a question or want to discuss your project? Send us a message below —
          we’ll get back to you within 24 hours.
        </p>

       <form
  className="mt-8 space-y-4 card"
  action="https://hook.us2.make.com/ak2wkz7kuhgel9ncqo39yobnjfxhoqpv"
  method="POST"
  target="_blank"
  onSubmit={() => setTimeout(() => (window.location.href = '/thank-you'), 600)}
>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input className="mt-1 w-full border rounded-md p-2" name="Name" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 w-full border rounded-md p-2" name="Email" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea className="mt-1 w-full border rounded-md p-2 h-32" name="Message" required />
          </div>

          <button className="btn btn-primary w-full mt-6" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
