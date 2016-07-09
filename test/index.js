import stylelint from "stylelint";
import test from "ava";

import config from "../";

async function lintPass(t, input) {
  const [rule, code] = input;
  const warnings = await lint(t, rule, code);

  t.is(warnings.length, 0, `flags no warnings`);
}

lintPass.title = providedTitle => `${providedTitle} with valid CSS`;

async function lintFail(t, input) {
  const [rule, , code] = input;
  const warnings = await lint(t, rule, code);

  t.true(warnings.length > 0, `flags some warnings`);
}

lintFail.title = providedTitle => `${providedTitle} with invalid CSS`;

function lint(t, rule, code) {
  return stylelint.lint({ config, code })
  .then(data => {
    return data.results[0]["warnings"]
      .filter(w => (w.rule == rule));
  });
}

test("custom-media-pattern", [lintPass, lintFail], [
"custom-media-pattern",
`:root {
  @custom-media --narrow-window (max-width: 30em);
}
`,
`:root {
  @custom-media --narrowWindow (max-width: 30em);
}
`
]);

test("custom-property-pattern", [lintPass, lintFail], [
"custom-property-pattern",
`:root {
  --foo-bar: 1px;
}
`,
`:root {
  --foo_bar: 1px;
}
`
]);

test("selector-class-pattern", [lintPass, lintFail], [
"selector-class-pattern",
`.selector-block__element--modifier {
  line-height: 1;

  &.-selector-modifier {
    color: #f00;
  }
}
`,
`.selectorBlock___element---modifier {
  line-height: 1;

  &.-selector_modifier {
    color: #f00;
  }
}
`
]);

test("selector-id-pattern", [lintPass, lintFail], [
"selector-id-pattern",
`#selector-id-pattern {
  display: none;
}
`,
`#selectorId_pattern {
  display: none;
}
`
]);
