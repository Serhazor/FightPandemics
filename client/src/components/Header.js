import React from "react";
import { NavBar } from "antd-mobile";
import { Menu, Dropdown } from "antd";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

// ICONS
import SvgIcon from "./Icon/SvgIcon";
import MenuIcon from "assets/icons/menu.svg";
import feedback from "assets/icons/feedback.svg";
import logo from "assets/logo.svg";
import Logo from "./Logo";

import { theme, mq } from "../constants/theme";
import GTM from "constants/gtm-tags";

const { colors, typography } = theme;
const { large } = typography.size;
const BrandLink = styled(Link)`
  display: inline-flex;
  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    padding-left: 4rem;
  }
`;
const StyledNavBar = styled(NavBar)`
  height: 6rem;
  margin-top: 0;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    height: auto;
    margin-top: 0;
  }
  .am-navbar-title {
    display: none;
  }
`;
const MenuToggle = styled(SvgIcon)`
  cursor: pointer;
  display: none !important;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: block !important;
  }
`;
const DesktopMenu = styled.div`
  background-color: ${colors.white};
  display: flex;
  align-items: center;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`;
const NavLinks = styled.div`
  align-self: flex-end;
  white-space: nowrap;
  button {
    border: none;
    background: transparent;
    cursor: pointer;

    img {
      margin-left: 1.5rem;
      pointer-events: none;
    }
  }
  ul {
    list-style-type: none;
    display: flex;
    margin-bottom: 0rem;
    margin-right: 5rem;
    align-items: center;

    .registerBtn {
      margin-bottom: 0.2rem;
      align-self: center;
    }

    .registerLink {
      display: block;
      border: 0.1rem solid ${colors.royalBlue};
      border-radius: 2rem;
      padding: 0 1rem;
      color: ${colors.royalBlue};
    }
    .registerLink:hover {
      background-color: ${colors.royalBlue};
      color: ${colors.white};
    }

    li {
      font-size: ${large};
      color: ${colors.darkerGray};
      padding: 0rem 1rem;
      a:not(.registerLink) {
        color: ${colors.darkerGray};
        text-decoration: none;
        padding: 1.65rem 1.4rem;
        transition: all 0.2s;
        border-bottom: 0.3rem solid transparent;
      }
      a:hover:not(.registerLink) {
        color: ${colors.royalBlue};
        border-bottom: 0.3rem solid ${colors.royalBlue};
      }
    }
  }
`;

const activeStyles = {
  fontWeight: "600",
  color: `${colors.royalBlue}`,
};

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100vw;
`;

export default ({
  authLoading,
  onMenuClick,
  isAuthenticated,
  user,
  onFeedbackIconClick,
}) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={`/profile/${user?.id || user?._id}`}>My Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      
      <Menu.Item>
        <Link to="/auth/logout">Sign Out</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        id={GTM.nav.prefix + GTM.nav.feedback}
        onClick={onFeedbackIconClick}
      >
        Feedback
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link
          id={GTM.nav.prefix + GTM.nav.addOrg}
          to="/create-organisation-profile"
        >
          Add Organisation
        </Link>
      </Menu.Item>
      <Menu.Divider />
      {user?.organisations?.length > 0
        ? user?.organisations?.map((organisation) => (
            <Menu.Item key={organisation._id}>
              <Link to={`/organisation/${organisation._id}`}>
                {organisation.name}
              </Link>
            </Menu.Item>
          ))
        : null}
      {user?.organisations?.length > 0 && <Menu.Divider />}
    </Menu>
  );
  const renderNavLinkItems = () => {
    if (authLoading) return null;
    return (
      <>
        <li>
          <NavLink
            id={GTM.nav.prefix + GTM.nav.aboutUs}
            activeStyle={activeStyles}
            to="/about-us"
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            id={GTM.nav.prefix + GTM.nav.feed}
            activeStyle={activeStyles}
            to="/feed"
          >
            Help Board
          </NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Dropdown overlay={menu} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  Profile
                </a>
              </Dropdown>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                id={GTM.nav.prefix + GTM.nav.login}
                activeStyle={activeStyles}
                to="/auth/login"
              >
                Sign In
              </NavLink>
            </li>
            <li className="registerBtn">
              <NavLink
                id={GTM.nav.prefix + GTM.nav.register}
                className="registerLink"
                to="/auth/signup"
              >
                Join Now
              </NavLink>
            </li>
            <button
              id={GTM.nav.prefix + GTM.nav.feedback}
              onClick={onFeedbackIconClick}
            >
              <SvgIcon src={feedback} />
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <HeaderWrapper className="header">
      <StyledNavBar
        mode="light"
        leftContent={
          <BrandLink to={isAuthenticated ? "/feed" : "/"}>
            <Logo src={logo} alt="Fight Pandemics logo" />
          </BrandLink>
        }
        rightContent={
          <div>
            <MenuToggle
              src={MenuIcon}
              style={{ fontSize: 24, cursor: "pointer" }}
              onClick={onMenuClick}
            />
            <DesktopMenu>
              <NavLinks>
                <ul>{renderNavLinkItems()}</ul>
              </NavLinks>
            </DesktopMenu>
          </div>
        }
      />
    </HeaderWrapper>
  );
};
