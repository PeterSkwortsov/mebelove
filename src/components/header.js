import React from "react";

export default function Header() {
    return (
        <header>
            <div className='header-inner'>
                <div className='logo'>MebeLove.</div>
                <nav>
                    <ul>
                        <li>
                            <a href='/'>Почему мы</a>
                        </li>
                        <li>
                            <a href='/'>Мебель</a>
                        </li>
                        <li>
                            <a href='/'>Контакты</a>
                        </li>
                        <li className='btn'>
                            <a href='/'>Заказать</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}