import React, { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const EFontAwesomeIcon = styled(FontAwesomeIcon)`
  transition: .25s all ease;
  &.menu-active-angle {
    transform: rotate(90deg);
  }
`;

const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  a {
    display: flex;
    align-items: center;
    width: 100%;
    font-weight: 400;
    color: ${props => props.theme.darkGreyColor};
    ${EFontAwesomeIcon} {
      color: ${props => props.theme.darkGreyColor};
    }
    &:hover {
      color: ${props => props.theme.lightGreyColor};
      ${EFontAwesomeIcon} {
        color: ${props => props.theme.lightGreyColor};
      }
    }
    &.active {
      color: ${props => props.theme.whiteColor};
      ${EFontAwesomeIcon} {
        color: ${props => props.theme.whiteColor};
      }
    }
  }
`;

const Item = styled(Link)`padding: 15px 30px;`;

const Icon = styled.div`
  width: 20px;
  display: flex;
  justify-content: center;
`;

const ItemText = styled.span`
  transition: .25s color ease;
  flex: 1;
  margin-left: 20px;
  font-size: 15px;
`;

const SubItemContainer = styled.div`
  height: 0;
  transition: .5s height ease;
  overflow: hidden;
  &.menu-active {
    height: ${props => props.maxHeight}px;
  }
`;

const SubItem = styled(Link)`padding: 15px 30px 16px 65px;`;

const SubItemText = styled.span`transition: .25s color ease;`;

const GlobalNavigationButton = ({ itemProps: { name, icon, url }, subItemProps }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { pathname } = useLocation();
  const onClick = e => {
    e.preventDefault();
    setToggleMenu(!toggleMenu);
  };
  return (
    <ItemContainer>
      <Item
        to={url ? url : ""}
        className={url !== undefined && pathname === url ? "active" : null}
        onClick={subItemProps && onClick}
      >
        <Icon>
          <EFontAwesomeIcon icon={icon} />
        </Icon>
        <ItemText>
          {name}
        </ItemText>
        {subItemProps &&
          <EFontAwesomeIcon icon={faAngleRight} className={toggleMenu && "menu-active-angle"} />}
      </Item>

      {subItemProps &&
        <SubItemContainer
          className={toggleMenu && "menu-active"}
          maxHeight={props => props.children.length * 45}
        >
          {subItemProps.map((item, idx) =>
            <SubItem
              to={item.url}
              key={idx}
              className={item.url !== undefined && pathname === item.url ? "active" : null}
            >
              <SubItemText>
                {item.name}
              </SubItemText>
            </SubItem>
          )}
        </SubItemContainer>}
    </ItemContainer>
  );
};

export default GlobalNavigationButton;