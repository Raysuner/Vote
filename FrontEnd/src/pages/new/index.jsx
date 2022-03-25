import { memo } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import AppHeader from "src/components/app-header";

function New() {
  return (
    <NewWrapper>
      <AppHeader title="腾讯投票" />
      <div className="choice single-choice">
        <Link to="/create">单选</Link>
      </div>
      <div className="choice multiple-choice">
        <Link to="/create?multiple=1">多选</Link>
      </div>
    </NewWrapper>
  );
}

export default memo(New);

const NewWrapper = styled.div``;
