const https = require('https');

// A known working place card embed structure requires the right q= parameter for standard iframe APIs.
// The easiest way to get the exact place card is using the q parameter rather than pb for simple embeds if pb isn't working.

const url = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15360.282833075276!2d74.4746671!3d15.7516825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf61f364372985%3A0xe5a14dca21625ff1!2sVisvesvaraya%20Technological%20University!5e0!3m2!1sen!2sin!4v1703058863678!5m2!1sen!2sin"

console.log("Actually, the best way to guarantee a place card for a specific place without an API key using the standard embed format is to use the `q` parameter format: https://maps.google.com/maps?q=Visvesvaraya+Technological+University,+Machhe,+Belagavi&t=&z=15&ie=UTF8&iwloc=&output=embed");
