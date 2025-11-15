export default function Services() {
  return (
    <section>
      <div className="container space-y-8">
        <h1 className="text-3xl font-bold text-navy">Services</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="font-semibold text-lg">NextShift Jumpstart</h3>
            <p className="text-gray-600 mt-2">Automate 3–5 high-impact tasks. $750, in 7 days.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-lg">NextShift Growth Suite</h3>
            <p className="text-gray-600 mt-2">Scale your automations with reporting and templates. $1,500.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-lg">NextShift Partner Plan</h3>
            <p className="text-gray-600 mt-2">Ongoing automation + support. $2,000/mo.</p>
          </div>
        </div>
        <a href="/audit" className="btn btn-primary">Book Your Free Audit</a>
      </div>
    </section>
  );
}