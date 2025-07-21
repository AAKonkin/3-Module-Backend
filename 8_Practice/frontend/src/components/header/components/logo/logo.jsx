import { Icon } from '../../../../components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LargeText = styled.div`
	font-size: 46px;
	font-weight: 600;
	line-height: 100%;
	margin-top: 17px;
`;

const SmallText = styled.div`
	font-size: 18px;
	font-weight: 700;
`;

const LogoContainer = ({ className }) => (
	<Link className={className} to={'/'}>
		<Icon id="fa-code" size="70px" margin="10px 10px 0 0" />
		<div>
			<LargeText>Блог</LargeText>
			<SmallText>веб-разработчика</SmallText>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	margin-top: -21px;
`;
