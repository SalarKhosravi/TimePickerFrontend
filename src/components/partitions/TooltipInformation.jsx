import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export function TooltipInformation({tooltipContent, children}) {
    const renderTooltip = (props) => (
        <Tooltip id="tooltip" {...props}>
            {tooltipContent}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement="bottom"
            delay={{show: 250, hide: 400}}
            overlay={renderTooltip}
        >
            {children}
        </OverlayTrigger>
    );
}
