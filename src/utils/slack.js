import config from '../../app.config';

export const submitToSlack = async (text) => {
  const response = await fetch(config.slack_webhook, {
    method: 'POST',
    body: JSON.stringify({ text })
  });
  if (response.status !== 200) {
    return 'There was an error submitting to Slack';
  }
};

export const formatForSlack = ({
  siteId,
  primaryDomain,
  defaultDomain,
  details
}) => `#### MWP 2.0 Assistance Request ####
    Site ID: \`${siteId}\`
    Primary Domain: \`${primaryDomain}\`
    Default Domain: \`${defaultDomain}\`
    Details: \`${details}\`
  `.replace(/[^\S\t\n\r]{2,}/gm, '');
