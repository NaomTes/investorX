import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import LangIcon from '@material-ui/icons/Language';
import InputAdornment from '@material-ui/core/InputAdornment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import { i18n, withTranslation } from '~/i18n';
import logo from '~/public/images/logo-agency.png';
import brand from '~/public/text/brand';
import { useTextAlign } from '~/theme/common';
import useStyles from './footer-style';
import useTitle from '../Title/title-style';
import { useText } from '~/theme/common';

function Copyright() {
  return (
    <Typography variant="body2" display="block" color="textSecondary">
      &copy;&nbsp;
      {brand.agency.footerText}
    </Typography>
  );
}

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
    link: ['#team', '#history', '#contact-us', '#locations'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    link: ['#resource', '#resource-name', '#another-resource', '#final-resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
    link: ['#privacy-policy', '#terms-of-use'],
  },
];

function Footer(props) {
  const [ctn, setCtn] = useState(null);
  const title = useTitle();
  const text = useText();
  // Theme breakpoints
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Translation Function
  const { t } = props;

  const classes = useStyles();
  const align = useTextAlign();
  const [values, setValues] = useState({
    lang: 'en'
  });

  useEffect(() => {
    setValues({ lang: i18n.language });
    setCtn(document.getElementById('main-wrap'));
  }, []);

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    if (event.target.value === 'ar') {
      i18n.changeLanguage('ar');
      props.toggleDir('rtl');
    } else {
      i18n.changeLanguage(event.target.value);
      props.toggleDir('ltr');
    }
  }

  return (
    <Container maxWidth="lg" component="footer" className={classes.footer}>
      <Grid style={{ marginTop: '180px' }} item xs={12}>
        <Typography style={{ textAlign: 'center' }} className={clsx(title.default, text.subtitle)} variant="h4">
          VC Connector platform was developed with a simple mission: eliminating barriers faced by women and minorities throughout the VC ecosystem.
        </Typography>
        <Typography style={{ textAlign: 'center', margin: '40px 40px' }} className={clsx(title.default, text.subtitle)} variant="h4">
          VC Connector provides direct access to investors without the need to incur expensive travel cost associated with in-person meetings.
        </Typography>
        <Typography style={{ textAlign: 'center' }} className={clsx(title.default, text.subtitle)} variant="h4">
          Register to our platform and let us pre-select VCs that would support and potentially invest in your startup ideas.
        </Typography>
      </Grid>
    </Container>
  );
}

Footer.propTypes = {
  t: PropTypes.func.isRequired,
  toggleDir: PropTypes.func,
};

Footer.defaultProps = {
  toggleDir: () => { },
};

export default withTranslation(['agency-landing'])(Footer);
