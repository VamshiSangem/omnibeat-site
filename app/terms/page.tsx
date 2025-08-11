export default function Terms() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-[#444]">Last updated: {new Date().toLocaleDateString()}</p>
      <p className="mt-6">We provide project-based setup for AI voice assistants and social media content. Pilots are scoped as described on the site.</p>
      <h2 className="mt-8 text-xl font-semibold">Guarantee</h2>
      <p className="mt-2">If we don’t reduce missed calls during the pilot compared to your baseline, we’ll work an extra week at no cost.</p>
      <h2 className="mt-8 text-xl font-semibold">Liability</h2>
      <p className="mt-2">Services are provided “as-is.” We’re not liable for indirect or consequential damages.</p>
      <h2 className="mt-8 text-xl font-semibold">Contact</h2>
      <p className="mt-2">Questions? Email <a className="underline" href="mailto:om.onenest@gmail.com">om.onenest@gmail.com</a>.</p>
    </main>
  )
}
