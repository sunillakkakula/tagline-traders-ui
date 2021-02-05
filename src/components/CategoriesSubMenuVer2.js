import React, { Component } from "react";
import "../assets/css/MegaMenu.css";
import $ from "jquery";
import categoriesMenu from "./categoriesMenuData";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
window.jQuery = $;
export default class CategoriesSubMenuVer2 extends Component {
  componentDidMount() {
    $(document).ready(function () {
      $(document).on("click", ".dropdown-menu", function (e) {
        e.stopPropagation();
      });

      if ($(window).width() < 992) {
        $(".has-submenu a").click(function (e) {
          e.preventDefault();
          $(this).next(".megasubmenu").toggle();

          $(".dropdown").on("hide.bs.dropdown", function () {
            $(this).find(".megasubmenu").hide();
          });
        });
      }
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg">
        <ul className="navbar-nav">
          {categoriesMenu.map((rootCategoryItem) => {
            return (
              <li className="nav-item dropdown">
                <div>
                  <img
                    className="img-thumbnail"
                    alt="Staples"
                    src={logo}
                    style={{
                      height: "3.5rem",
                      width: "3.5rem",
                      marginRight: "5em",
                    }}
                  />
                </div>
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  data-toggle="dropdown"
                >
                  {rootCategoryItem.name}
                  <ul className="dropdown-menu">
                    {rootCategoryItem.categories.map((categoryItem) => (
                      <li className="has-submenu">
                        <Link
                          className="dropdown-item dropdown-toggle"
                          to="#"
                          onClick={() => console.log("Clicked Link Dropdown 3")}
                        >
                          {categoryItem.name}
                        </Link>
                        <div className="megasubmenu dropdown-menu">
                          <div className="row">
                            <div className="col-12">
                              <ul className="list-unstyled">
                                {console.log(
                                  " Sub Cat :" + JSON.stringify(categoryItem)
                                )}
                                {categoryItem.subCategories.map(
                                  (subCategoryItem) => (
                                    <li>
                                      <Link to="#">{subCategoryItem.name}</Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
