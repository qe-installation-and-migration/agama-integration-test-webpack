#
# spec file for package agama-integration-tests
#
# Copyright (c) 2024 SUSE LLC
#
# All modifications and additions to the file contributed by third parties
# remain the property of their copyright owners, unless otherwise agreed
# upon. The license for this file, and modifications and additions to the
# file, is the same license as for the pristine package itself (unless the
# license for the pristine package is not an Open Source License, in which
# case the license is the MIT License). An "Open Source License" is a
# license that conforms to the Open Source Definition (Version 1.9)
# published by the Open Source Initiative.

# Please submit bugfixes or comments via https://bugs.opensuse.org/
#

Name:           agama-integration-tests
Version:        0
Release:        0
Summary:        Support for running Agama integration tests
License:        GPL-2.0-or-later
URL:            https://github.com/openSUSE/agama
# source_validator insists that if obscpio has no version then
# tarball must neither
Source0:        agama-integration-tests.tar
Source10:       package-lock.json
Source11:       node_modules.spec.inc
Source12:       node_modules.sums
%include %_sourcedir/node_modules.spec.inc
BuildArch:      noarch
BuildRequires:  local-npm-registry
Requires:       nodejs(engine) >= 18

%description
This package provides infrastructure and tooling needed to run the Agama
integration tests. It includes the Puppeteer framework with all dependencies.

The package includes only one example test, the real tests should be added from
outside.

%prep
%autosetup -p1 -n agama-integration-tests

%build
rm -f package-lock.json
local-npm-registry %{_sourcedir} install --omit=optional --with=dev --legacy-peer-deps || ( find ~/.npm/_logs -name '*-debug.log' -print0 | xargs -0 cat; false)
npm install
npm run build

%install
install -D -d -m 0755 %{buildroot}%{_datadir}/agama/integration-tests
cp -aR %{_builddir}/agama-integration-tests/dist/* %{buildroot}%{_datadir}/agama/integration-tests
# delete the huge vendor.js.map file, we usually do not need backtrace locations from the node packages
rm %{buildroot}%{_datadir}/agama/integration-tests/vendor.js.map
rm %{buildroot}%{_datadir}/agama/integration-tests/vendor.js.LICENSE.txt

%files
%defattr(-,root,root,-)
%doc README.md
%license LICENSE
%dir %{_datadir}/agama
%{_datadir}/agama/integration-tests

%changelog
