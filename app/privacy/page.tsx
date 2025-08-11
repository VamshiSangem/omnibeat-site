export default function Privacy() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-[#444]">Last updated: {new Date().toLocaleDateString()}</p>
      <p className="mt-6">We collect the details you submit in the contact form (name, email, message, and optional phone/city) so we can reply. We don’t sell your data.</p>
      <h2 className="mt-8 text-xl font-semibold">Email</h2>
      <p className="mt-2">Messages are delivered to om.onenest@gmail.com via a secure form service. If you want your data deleted, email us.</p>
      <h2 className="mt-8 text-xl font-semibold">Analytics</h2>
      <p className="mt-2">We may use privacy-friendly analytics to understand traffic. No personal profiles.</p>
      <h2 className="mt-8 text-xl font-semibold">Contact</h2>
      <p className="mt-2">Questions? Email <a className="underline" href="mailto:om.onenest@gmail.com">om.onenest@gmail.com</a>.</p>
    </main>
  )
}
