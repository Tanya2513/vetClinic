
function Home() {
    return <div>
        <h1 className="main">Ветеринарна клініка LAPA</h1>
        <img src="img/main.jpg" width="100%" height="100%" alt="картинка"/>
        <p className="description">Наша ветеринарна клініка пропонує повний спектр високоякісних
            послуг ветеринарної медицини. Ми працюємо у відповідності до Європейських протоколів лікування тварин.
            Використовуємо лише сертифіковані лікарські засоби.</p>
        <p className="description">Основні послуги, що пропонує наша клініка: щорічний ветеринарний огляд;
                щеплення тварин; амбулаторне лікування; стаціонарне лікування; операції.</p>
        <p className="description"> Для більш детальної інформації телефонуйте за номером: 0733058599</p>
        <div className="map">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13647.695289777508!2d30.448494919494724!3d50.45139955936611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cc29d94f8017%3A0xdb084139f89ee0b!2z0L_RgNC-0YHQvy4g0J_QvtCx0LXQtNGLLCAzMiwg0JrQuNC10LIsIDAyMDAw!5e0!3m2!1sru!2sua!4v1633097210490!5m2!1sru!2sua"
                width="100%" height="400" allowFullScreen="" loading="lazy"></iframe>
        </div>

    </div>;
}


export default Home;