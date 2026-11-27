export default function Settings({ onBack }) {
  return (
    <section className="settings">
      <h2>Ustawienia aplikacji</h2>

      <button onClick={onBack}>Powrót</button>
    </section>
  );
}
