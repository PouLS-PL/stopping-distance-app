export const translations = {
  en: {
    test: "English text",
    settingsTitle: "Settings",
    incline: "Incline: ",
    appSettings: "App settings",
    deceleration: `Deceleration [m/s²]`,
    reactionTime: "Reaction time [s] ",
    altCalcMethod:
      "Calculate deceleration based on braking force and vehicle mass",
    brakingForce: "Braking force [N] ",
    mass: "Total vehicle mass [kg] ",
    back: "Back",
    inclineModal: (
      <>
        Incline: Longitudinal gradient in percent (positive values: ascent;
        negative values: descent).
        <br />
        <br />
        -37.45%: steepest descent in the world
        <br />
        -10%: minimum descent in mountainous terrain to place the A-22 sign in
        Poland
        <br />
        -7%: minimum descent outside mountainous terrain to place the A-22 sign
        in Poland
        <br />
        0%: level road
        <br />
        ±3%: if the gradient value is greater, a sign informing about the
        incline is placed on the bicycle route (in Poland)
        <br />
        6%: minimum ascent outside mountainous terrain to place the A-23 sign in
        Poland
        <br />
        8%: minimum ascent in mountainous terrain to place the A-23 sign in
        Poland
        <br />
        5.5° ≈ 9.6%: maximum ascent on the driving exam in Poland
        <br />
        12%: a vehicle combination consisting of a passenger car and a trailer,
        loaded to their maximum total masses, should start from a standstill at
        least 5 times within 5 minutes on an ascent with this gradient (in
        Poland)
        <br />
        ±28%: steepest ascent/descent in Poland
        <br />
        35%: steepest ascent in the world
        <br />
      </>
    ),
    surfaceModal: (
      <>
        <strong>Surface condition</strong> (μ — coefficient of friction)
        <br />
        <img
          className="modal-condition-icon"
          src="/weather_symbols_sunny.png"
        />{" "}
        dry and rough asphalt (μ = 0.9)
        <br />
        <img className="modal-condition-icon" src="/heap-of-sand.png" />{" "}
        sand-covered asphalt (μ = 0.55)
        <br />
        <img
          className="modal-condition-icon"
          src="/weather_symbols_rain.png"
        />{" "}
        wet asphalt (μ = 0.45)
        <br />
        <img
          className="modal-condition-icon"
          src="/weather_symbols_snow.png"
        />{" "}
        snow-covered asphalt (μ = 0.25)
        <br />
        <img className="modal-condition-icon" src="/A-32.png" /> very slippery
        asphalt, icy asphalt, black ice (μ = 0.1)
        <br />
      </>
    ),
    decelerationModal: (
      <>
        Opóźnienie: Opóźnienie pojazdu na drodze poziomej o nawierzchni twardej,
        suchej i czystej.
        <br />
        <br />
        0,4g ≈ 3,92 m/s/s - minimalna wartość dla maksymalnie obciążonego
        pojazdu samochodowego w Polsce
        <br />
        <br />
        0,58g ≈ 5,68 m/s/s - minimalna wartość dla maksymalnie obciążonego
        pojazdu kat. M1 (osobówka) zarejestrowanego po 2010 r. w Polsce
        <br />8 m/s/s ≈ 0,81g - nowoczesny samochód
        <br />9 m/s/s ≈ 0,91g - samochód sportowy
      </>
    ),
    reactionTimeModal: (
      <>
        Czas reakcji: Suma czasu reakcji kierującego na bodziec, czasu potrzebny
        na aktywowanie hamulca i czas reakcji układu hamulcowego.
        <br />
        <br />
        Czas reakcji trzeźwego kierującego to około 0,6—0,85 s
        <br />
        Reakcja układu hamulcowego to około 0,2—0,5 s
        <br />
        Zalecana wartość: 1,35 s
      </>
    ),
    brakingForceModal: (
      <>
        Siła hamowania: Siła hamowania pojazdu na drodze poziomej o nawierzchni
        twardej, suchej i czystej.
        <br />
        <br />
        14 210—14 500 N: minimalna wartość dla pojazdu o kat. M1 (osobówka) o
        DMC 2,5 t zarejestrowanego po 2010 r. w Polsce
      </>
    ),
    massModal: (
      <>
        Rzeczywista masa całkowita: masa pojazdu łącznie z masą znajdujących się
        na nim rzeczy i osób.
        <br />
        <br />
        1179 kg — pusty Hyundai i30 GDH 1820 kg — maksymalnie obciążony Hyundai
        i30 GDH{" "}
      </>
    ),
  },
  pl: {
    test: "polski tekst",
    settingsTitle: "Ustawienia",
    incline: "Nachylenie: ",
    appSettings: "Ustawienia aplikacji",
    deceleration: `Opóźnienie [m/s²]`,
    reactionTime: "Czas reakcji [s] ",
    altCalcMethod: "Oblicz opóźnienie na podstawie siły hamowania i RMC",
    brakingForce: "Siła hamowania [N] ",
    mass: "Rzeczywista masa całkowita [kg] ",
    back: "Powrót",
    inclineModal: (
      <>
        Nachylenie: Nachylenie podłużne w procentach (dodatnie wartości:
        wzniesienie; ujemne wartości: spadek).
        <br />
        <br />
        -37,45%: najbardziej stromy zjazd na świecie
        <br />
        -10%: minimalny spadek w terenie górzystym do umieszczenia znaku A-22 w
        Polsce
        <br />
        -7%: minimalny spadek poza terenem górzystym do umieszczenia znaku A-22
        w Polsce
        <br />
        0%: droga pozioma
        <br />
        ±3%: jeśli wartość nachylenia jest większa, na szlaku rowerowym
        umieszcza się tabliczkę informującą o nachyleniu (w Polsce)
        <br />
        6%: minimalne wzniesienie poza terenem górzystym do umieszczenia znaku
        A-23 w Polsce
        <br />
        8%: minimalne wzniesienie w terenie górzystym do umieszczenia znaku A-23
        w Polsce
        <br />
        5,5° ≈ 9,6%: maksymalne wzniesienie na egzaminie w Polsce
        <br />
        12%: zespół pojazdów składający się z samochodu osobowego i przyczepy,
        obciążonych do wartości maksymalnych mas całkowitych, powinien ruszyć z
        miejsca co najmniej 5 razy w czasie 5 minut pod wzniesienie o tym
        nachyleniu (w Polsce)
        <br />
        ±28%: najbardziej stromy podjazd/zjazd w Polsce
        <br />
        35%: najbardziej stromy podjazd na świecie
        <br />
      </>
    ),
    surfaceModal: (
      <>
        <strong>Stan nawierzchni</strong> (μ — współczynnik tarcia)
        <br />
        <img
          className="modal-condition-icon"
          src="/weather_symbols_sunny.png"
        />{" "}
        suchy i szorstki asfalt (μ = 0,9)
        <br />
        <img className="modal-condition-icon" src="/heap-of-sand.png" />{" "}
        zabrudzony piachem asfalt (μ = 0,55)
        <br />
        <img
          className="modal-condition-icon"
          src="/weather_symbols_rain.png"
        />{" "}
        mokry asfalt (μ = 0,45)
        <br />
        <img
          className="modal-condition-icon"
          src="/weather_symbols_snow.png"
        />{" "}
        pokryty śniegiem asfalt (μ = 0,25)
        <br />
        <img className="modal-condition-icon" src="/A-32.png" /> bardzo śliski
        asfalt, oblodzony asfalt, gołoledź (μ = 0,1)
        <br />
      </>
    ),
    decelerationModal: (
      <>
        Opóźnienie: Opóźnienie pojazdu na drodze poziomej o nawierzchni twardej,
        suchej i czystej.
        <br />
        <br />
        0,4g ≈ 3,92 m/s/s - minimalna wartość dla maksymalnie obciążonego
        pojazdu samochodowego w Polsce
        <br />
        <br />
        0,58g ≈ 5,68 m/s/s - minimalna wartość dla maksymalnie obciążonego
        pojazdu kat. M1 (osobówka) zarejestrowanego po 2010 r. w Polsce
        <br />8 m/s/s ≈ 0,81g - nowoczesny samochód
        <br />9 m/s/s ≈ 0,91g - samochód sportowy
      </>
    ),
    reactionTimeModal: (
      <>
        Czas reakcji: Suma czasu reakcji kierującego na bodziec, czasu potrzebny
        na aktywowanie hamulca i czas reakcji układu hamulcowego.
        <br />
        <br />
        Czas reakcji trzeźwego kierującego to około 0,6—0,85 s
        <br />
        Reakcja układu hamulcowego to około 0,2—0,5 s
        <br />
        Zalecana wartość: 1,35 s
      </>
    ),
    brakingForceModal: (
      <>
        Siła hamowania: Siła hamowania pojazdu na drodze poziomej o nawierzchni
        twardej, suchej i czystej.
        <br />
        <br />
        14 210—14 500 N: minimalna wartość dla pojazdu o kat. M1 (osobówka) o
        DMC 2,5 t zarejestrowanego po 2010 r. w Polsce
      </>
    ),
    massModal: (
      <>
        Rzeczywista masa całkowita: masa pojazdu łącznie z masą znajdujących się
        na nim rzeczy i osób.
        <br />
        <br />
        1179 kg — pusty Hyundai i30 GDH 1820 kg — maksymalnie obciążony Hyundai
        i30 GDH{" "}
      </>
    ),
  },
};
