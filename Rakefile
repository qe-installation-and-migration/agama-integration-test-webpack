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
    destdir = ENV["DESTDIR"] || "/"

    puts "Installing the integration tests..."
    FileUtils.mkdir_p(File.join(destdir, "/usr/share/agama/system-tests"))
    FileUtils.cp_r("dist/.", File.join(destdir, "/usr/share/agama/system-tests"))
end
