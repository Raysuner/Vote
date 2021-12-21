import { memo } from "react";

import styled from "styled-components";

export default memo(function AppHeader({ title }) {
  return (
    <AppHeaderWrapper>
      <i className="icon"></i>
      <div className="title">{title}</div>
    </AppHeaderWrapper>
  );
});

const AppHeaderWrapper = styled.header`
  margin-bottom: 30px;
  .title {
    font-size: 20px;
    font-weight: 800;
    text-align: center;
  }
`;
