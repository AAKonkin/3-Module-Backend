import { H2, Icon } from "../../../../components";
import { SpecialPanel } from "../specialPanel/specialPanel";
import { useNavigate } from "react-router-dom";
import { PROP_TYPES } from "../../../../constants";
import styled from "styled-components";

const PostContentConteiner = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const navigate = useNavigate();
  return (
    <div className={className}>
      <img
        src={
          imageUrl ||
          "https://i.pinimg.com/originals/5e/c9/ee/5ec9ee5d7ee09690b49b532aba06d8c6.jpg"
        }
        alt={title}
      />
      <H2>{title}</H2>
      <SpecialPanel
        id={id}
        publishedAt={publishedAt.split("T")[0]}
        margin="-20px 0 20px"
        editButton={
          <Icon
            id="fa-pencil-square-o"
            margin="0 10px 0 0"
            size="21px"
            onClick={() => navigate(`/post/${id}/edit`)}
          />
        }
      />
      <div className="post-text">{content}</div>
    </div>
  );
};

export const PostContent = styled(PostContentConteiner)`
  & img {
    float: left;
    max-width: 400px;
    max-height: 350px;
    margin: 0 20px 10px 0;
  }

  & .post-text {
    font-size: 18px;
    white-space: pre-line;
  }
`;

PostContent.propTypes = {
  post: PROP_TYPES.POST.isRequired,
};
