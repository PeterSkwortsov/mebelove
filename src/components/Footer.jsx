import vk from "../images/vk.svg";
import tg from "../images/telegramm.svg";

const Footer = () => {
  return (
    <div className="footer-inner">
      <nav>
        <ul>
          <li>
            <a href="/">Ответы на вопросы</a>
          </li>
          <li>
            <a href="/">Мебель</a>
          </li>
          <li>
            <a href="/">Контакты</a>
          </li>
          <li>
            <a href="/">Заказать</a>
          </li>
          <li>
            <a href="/">Вакансии</a>
          </li>
        </ul>
      </nav>
      <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        <img src={vk} alt="vk" />
        <img src={tg} alt="telegram" />
      </div>
    </div>
  );
};
export default Footer;
