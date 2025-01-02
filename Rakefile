#
# You should have received a copy of the GNU General Public License along
# with this program; if not, contact SUSE LLC.
#
# To contact SUSE LLC about this file by physical or electronic mail, you may
# find current contact information at www.suse.com.

require "fileutils"
require "yast/rake"

Rake::Task["install"].clear
task :install do
    destination_directory = ENV["DESTDIR"] || "/"
    test_bundle_name = ENV["AGAMA_TEST"] || ""

    puts "Creating installation directory ..."
    FileUtils.mkdir_p(File.join(destination_directory, "/usr/share/agama/system-tests"))

    puts "Installing vendor bundle with puppeteer and its dependencies ..."
    FileUtils.cp("dist/vendor.js", File.join(destination_directory, "/usr/share/agama/system-tests"))

    puts "Installing integration test bundle and its source map ..."
    Dir.glob("dist/#{test_bundle_name}.*").each do |file|
      FileUtils.cp(file, File.join(destination_directory, "/usr/share/agama/system-tests"))
    end
end
